/**
 * SEARN NRA LMS Pilot Feedback Form — Apps Script backend.
 *
 * Paste this whole file into Extensions -> Apps Script (replacing whatever
 * is in Code.gs) on the spreadsheet, save, then create a NEW VERSION
 * deployment (Deploy -> Manage deployments -> pencil icon -> New version ->
 * Deploy). Reusing "New version" keeps the same /exec URL, so settings.js
 * does not need to change.
 *
 * SHEET ROUTING
 * One response sheet per user group. Create these tabs in the spreadsheet
 * up front (exact names, case-sensitive) — the script will also create them
 * automatically if missing, but pre-creating avoids relying on that:
 *   - NRA Admin
 *   - NRA Manager
 *   - NRA Staff
 *   - IT            (currently hidden on the form, kept for when it's re-enabled)
 *
 * WHY YOU (USUALLY) DON'T NEED TO EDIT THIS FILE WHEN QUESTIONS CHANGE
 * The feedback form sends each scored item, open question, and closing
 * question as a {label, value} pair rather than as fixed named fields.
 * This script builds each sheet's header row FROM those labels the first
 * time it sees them, and reuses matching headers by exact text match on
 * every later submission. So if you reword a question in index.html:
 *   - The next submission adds a new column with the new wording.
 *   - Old rows / old column stay as-is under the old header (nothing is
 *     silently overwritten or misaligned).
 * You only need to touch this script when:
 *   - You add a brand-new user group (add one line to SHEET_BY_GROUP).
 *   - You add a new top-level respondent field beyond name/email/organization
 *     (add it to the RESPONDENT_FIELDS block below).
 */

var SHEET_BY_GROUP = {
  leadership: "NRA Admin",
  manager: "NRA Manager",
  staff: "NRA Staff",
  it: "IT",
};

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheetName = SHEET_BY_GROUP[data.groupKey] || "Other";
  var sheet = getOrCreateSheet(ss, sheetName);

  var r = data.respondent || {};
  var scores = data.scores || [];   // [{ area, question, score, comment }]
  var open = data.open || [];       // [{ question, response }]
  var common = data.common || [];   // [{ question, response }]

  // Ordered (header, value) pairs for this submission.
  var headers = ["Submitted At", "Name", "Email", "Organization name"];
  var values = [data.submittedAt || "", r.name || "", r.email || "", r.organization || ""];

  scores.forEach(function (s) {
    headers.push(s.area + " Score (1-5)");
    values.push(s.score || "");
    headers.push(s.question);
    values.push(s.comment || "");
  });

  open.forEach(function (o) {
    headers.push(o.question);
    values.push(o.response || "");
  });

  common.forEach(function (c) {
    headers.push(c.question);
    values.push(c.response || "");
  });

  var headerMap = ensureHeaders(sheet, headers);

  var lastCol = sheet.getLastColumn();
  var row = new Array(lastCol).fill("");
  headers.forEach(function (h, i) {
    var col = headerMap[h];
    if (col) row[col - 1] = values[i];
  });
  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

/**
 * Makes sure every header in `headers` exists as a column on `sheet`,
 * appending any that are missing (never reordering/removing existing ones),
 * and returns a map of header text -> 1-based column index.
 */
function ensureHeaders(sheet, headers) {
  var lastCol = sheet.getLastColumn();
  var existing = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

  var headerMap = {};
  existing.forEach(function (h, i) {
    if (h) headerMap[h] = i + 1;
  });

  if (existing.length === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    headers.forEach(function (h, i) {
      headerMap[h] = i + 1;
    });
    return headerMap;
  }

  var toAppend = headers.filter(function (h) {
    return !(h in headerMap);
  });

  if (toAppend.length > 0) {
    var startCol = lastCol + 1;
    sheet.getRange(1, startCol, 1, toAppend.length).setValues([toAppend]);
    toAppend.forEach(function (h, i) {
      headerMap[h] = startCol + i;
    });
  }

  return headerMap;
}
