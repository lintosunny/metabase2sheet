function importMetabaseMulti_functionName() {
  const baseUrl = "{{METABASE_URL}}";
  const username = "{{USER_NAME}}";
  const password = "{{PASSWORD}}";
  const props = PropertiesService.getScriptProperties();

  try {
    let token = props.getProperty("METABASE_SESSION");
    if (!token) {
      Logger.log("No existing token found, requesting new session...");
      token = getNewMetabaseSession_functionName(baseUrl, username, password);
      props.setProperty("METABASE_SESSION", token);
    } else {
      Logger.log("Using existing token from script properties.");
    }

    const logs = [];
    const statuses = [];

    // Load data from multiple cards into different sheets
    Logger.log("Fetching Metabase card data for Card ID {{card_ID}}...");
    const result = fetchMetabaseCardToSheet_functionName(baseUrl, token, {{card_ID}}, "{{TAB_NAME}}", {{num_Columns}}, username, password);
    logs.push(result.log);
    statuses.push(result.status);

    // Send log results via email
    const subject = `${statuses}  Automation - {{SHEET_NAME}} - {{TAB_NAME}}`;
    const body = logs.join("\n\n");
    Logger.log("Sending email with results. Status: " + statuses);
    MailApp.sendEmail("{{EMAIL_ID}}", subject, body);

  } catch (e) {
    Logger.log("Exception occurred: " + e.toString());
    MailApp.sendEmail("{{EMAIL_ID}}", "❌ Metabase Import Error - {{SHEET_NAME}} - {{TAB_NAME}}", e.toString());
  }
}

function fetchMetabaseCardToSheet_functionName(baseUrl, token, cardId, sheetName, numColumns, username, password) {
  const encodedParams = encodeURIComponent(JSON.stringify(PARAMS_functionName));
  const queryUrl = `${baseUrl}/api/card/${cardId}/query/csv?parameters=${encodedParams}`;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  Logger.log("Fetching data from Metabase API for card " + cardId + " and sheet " + sheetName + "...");

  try {
    const response = makeMetabaseRequest_functionName(queryUrl, token);

    if ([401, 403].includes(response.getResponseCode())) {
      Logger.log("⚠️ Token expired, refreshing...");
      token = getNewMetabaseSession_functionName(baseUrl, username, password);
      PropertiesService.getScriptProperties().setProperty("METABASE_SESSION", token);
      Logger.log("Retrying request with new token...");
      response = makeMetabaseRequest_functionName(queryUrl, token);
    }

    Logger.log("Metabase API response code: " + response.getResponseCode());

    const data = Utilities.parseCsv(response.getContentText());
    if (!data || data.length === 0) {
      throw new Error("No data fetched from Metabase.");
    }
    
    Logger.log("Retrieved data has " + data.length + " rows.");

    const lastRow = getLastRowForRange_functionName(sheet, numColumns);
    const beforeCount = lastRow - 1;
    Logger.log(`Clearing existing data from ${sheetName}...`);
    sheet.getRange(2, 1, lastRow, numColumns).clearContent();

    Logger.log(`Writing new data to ${sheetName}...`);
    sheet.getRange(2, 1, data.length, numColumns).setValues(data);
    const afterCount = getLastRowForRange_functionName(sheet, numColumns) - 1;
    const status = (afterCount === data.length) ? "✅" : "❌";

    return {
      status,
      log: [
        `Card ${cardId} → ${sheetName}`,
        `   Rows before append: ${beforeCount}`,
        `   Rows fetched from Metabase: ${data.length}`,
        `   Rows after append: ${afterCount}`,
        `   Status: ${status}`
      ].join("\n")
    };
  } catch (e) {
    Logger.log("Error while fetching or writing data: " + e.toString());
    throw e;
  }
}

function getNewMetabaseSession_functionName(baseUrl, username, password) {
  Logger.log("Requesting new session token from Metabase API...");
  const loginResponse = UrlFetchApp.fetch(`${baseUrl}/api/session`, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ username, password }),
    muteHttpExceptions: true
  });
  Logger.log("Login response code: " + loginResponse.getResponseCode());
  Logger.log("Login response body: " + loginResponse.getContentText());
  if (loginResponse.getResponseCode() !== 200) {
    throw new Error(`Failed to authenticate to Metabase. Response Code: ${loginResponse.getResponseCode()}. Response Body: ${loginResponse.getContentText()}`);
  }
  const session = JSON.parse(loginResponse.getContentText());
  Logger.log("New session token acquired.");
  return session.id;
}

function makeMetabaseRequest_functionName(queryUrl, token) {
  return UrlFetchApp.fetch(queryUrl, {
    method: "post",
    headers: { "X-Metabase-Session": token },
    muteHttpExceptions: true
  });
}

function getLastRowForRange_functionName(sheet, numCols) {
  const data = sheet.getRange(1, 1, sheet.getMaxRows(), numCols).getValues();
  for (let row = data.length - 1; row >= 0; row--) {
    if (data[row].join("").trim() !== "") {
      return row + 1;
    }
  }
  return 1;
}