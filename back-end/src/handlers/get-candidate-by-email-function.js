const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
   
    const email = event.Records[0].dynamodb.NewImage.candidateEmail.S;
        
    const params = {
      TableName: 'candidates',
      FilterExpression: 'candidateEmail = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };
    try {
      const result = await dynamoDB.scan(params).promise();
      return result.Items;
    } catch (error) {
      console.error('Error retrieving user from DynamoDB:', error);
      throw error;
  }
}

