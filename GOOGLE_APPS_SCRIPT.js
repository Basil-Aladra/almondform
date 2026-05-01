// GOOGLE APPS SCRIPT - Save this to your Google Apps Script project
// Go to https://script.google.com and create a new project

/*
 * REQUIRED GOOGLE SHEET COLUMNS:
 * Column A: Timestamp
 * Column B: Full Name
 * Column C: Phone Number
 * Column D: Birth Date
 * Column E: Occasion
 * Column F: Other Occasion Details
 */

function doPost(e) {
  // Get the active spreadsheet (must be open in Google Drive)
  const sheet = SpreadsheetApp.getActiveSheet();
  
  try {
    // Parse the JSON data from the POST request
    const data = JSON.parse(e.postData.contents);
    
    // Add the data as a new row (includes timestamp as first column)
    sheet.appendRow([
      new Date(), // Adds current date and time
      data.fullName,
      data.phoneNumber,
      data.birthDate,
      data.occasion,
      data.otherOccasionDetails || '' // Add details if they chose 'Other', otherwise empty
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
    fullName: 'John Doe',
    phoneNumber: '+1 (555) 123-4567',
    birthDate: '1990-01-01',
    occasion: 'Wedding'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  Logger.log(doPost(mockEvent));
}
