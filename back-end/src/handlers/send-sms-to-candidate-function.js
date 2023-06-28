const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {  
    const params = {
      Message: 'Status Change',
      PhoneNumber: event.contactPhone,
    };
    
    try {
      const data = await sns.publish(params).promise();
      console.log(`Message sent to ${params.PhoneNumber}`);
      console.log("MessageID is " + data.MessageId);
    } catch (err) {
      console.error(err);
 }
}

