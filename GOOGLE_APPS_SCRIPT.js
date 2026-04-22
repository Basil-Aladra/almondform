// GOOGLE APPS SCRIPT - Save this to your Google Apps Script project
// Go to https://script.google.com and create a new project

function doPost(e) {
  // Get the active spreadsheet (must be open in Google Drive)
  const sheet = SpreadsheetApp.getActiveSheet();
  
  try {
    // Parse the JSON data from the POST request
    const data = JSON.parse(e.postData.contents);
    
    // Add the data as a new row
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.message
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success',
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for debugging in Apps Script editor)
function testPost() {
  const testData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    message: 'This is a test message'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  Logger.log(doPost(mockEvent));
}
