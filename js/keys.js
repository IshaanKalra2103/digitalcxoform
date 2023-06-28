export const keysPromise = fetch(
  "https://digitalcxoapi-2abd74fc33cb.herokuapp.com/keys"
)
  .then((response) => response.json())
  .then((data) => {
    let keys = data[0];

    let sheetID = keys.sheetID;
    let emailId = keys.emailId;
    let key = keys.key;
    let serviceID = keys.serviceID;
    let templateID = keys.templateID;
    let mailchimpID = keys.mailchimpID

    return { sheetID, emailId, key, serviceID, templateID, mailchimpID};
  })
  .catch((error) => {
    console.error("Error:", error);
  });
