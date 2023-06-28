const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const stepfunctions = new AWS.StepFunctions();

  const status = event.Records[0].dynamodb.NewImage.status.S;
  const previousStatus = event.Records[0].dynamodb.OldImage?.status.S;

  if (status === "PENDING" && previousStatus !== status) {

  const params = {
    stateMachineArn: 'arn:aws:states:us-east-1:318153063077:stateMachine:MyStateMachine',
    input: JSON.stringify(event)
  };
  
  try {
    const response = await stepfunctions.startExecution(params).promise();
    console.log('Execution started:', response.executionArn);
    return event;
    
  } catch (error) {
    console.error('Error starting execution:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        error: error.message
      })
    };
  }
 }
};
