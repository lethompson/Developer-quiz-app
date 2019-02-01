//single state object

var state = {
  questions: [{
      question: 'You currently developed an application which makes use of AWS RDS - MySQL service. During the testing phase, you can see that the database is taking a performance hit. After further investigation, you can see that the same queries are causing the performance bottleneck on the application. Which of the following development steps should be taken to resolve this issue?',
      answers: ['Use the Multi-AZ feature for the underlying database', 'Change the underlying instance type for the database', 'Use SQS queues to store the results of the query for faster access', 'Use AWS ElastiCache to store the results of the query for faster access'],
      answerCorrect: 3
    },
    {
      question: 'You written an application that uploads objects onto an S3 bucket. The size of the object varies between 200-500 MB. You have seen that the application sometimes takes longer than expected time to upload the object. You want to improve the performance of the application. Which of the following would you consider?',
      answers: ['Create multiple threads and upload the objects in the multiple threads', 'Write the items in batches for better performance', 'Use the Multipart upload API', 'Enable versioning on the Bucket'],
      answerCorrect: 2
    },
    {
      question: 'You just created an AWS Lambda function. You are running the function, but the output of the function is not as expected. You need to check and see what is the issue? Which of the following can help the developer debug the issue with the Lambda function?',
      answers: ['Check Cloudwatch logs', 'Check VPC Flow Logs', 'Check AWS Trusted Advisor', 'Check AWS Inspector'],
      answerCorrect: 0
    },
    {
      question: 'You are a developer for a company that is developing a .net based application. This application will be hosted in AWS. There is a need to encrypt data. Currently the company does not have a key store for managing encryption. Which of the following could the developer use in this code for encrypting data?',
      answers: ['Use S3 Server-side encryption to work with encryption keys', 'Use the AWS KMS service to generate data keys', 'Use the AWS Config service to generate data keys', 'Use S3 client-side encryption to work with encryption keys'],
      answerCorrect: 1
    },
    {
      question: 'You have been hired as a developer to work on an application. This application is hosted on an EC2 Instance and interacts with an SQS queue. You have noticed that when messages are being pulled by the application, alot of empty responses are being returned. What change can you make to ensure that the application uses the SQS queue effectively?',
      answers: ['Use long polling', 'Set a custom visibility timeout', 'Use short polling', 'Implement exponential backoff'],
      answerCorrect: 0
    },
    {
      question: 'You just deployed an AWS Lambda function. This Lambda function would be invoked via the API gateway service. You want to know if there were any errors while the Lambda function was being invoked. Which of the following service would allow you to check the performance of your underlying Lambda function?',
      answers: ['VPC Flow Logs', 'Cloudwatch', 'Cloudtrail', 'AWS Trusted Advisor'],
      answerCorrect: 1
    },
    {
      question: 'An application running on Amazon EC2 must store objects in an S3 bucket. Which option follows best practices for granting the application access to the S3 bucket?',
      answers: ['Use the userdata script to store an access key on the EC2 instance', 'Use an AWS IAM role with permissions to write to the S3 bucket', 'Store an access key encrypted with AWS KMS in Amazon S3', 'Embed an access key in the application code'],
      answerCorrect: 1
    },
    {
      question: 'A developer is writing an application that will store data in a DynamoDB table. The ratio of reads operations to write operations will be 1000 to 1, with the same data beign accessed frequently. What should the Developer enable on the DynamoDB table to optimize performance and mininimze costs?',
      answers: ['Amazon DynamoDB auto scaling', 'Amazon DynamoDB cross-region replication', 'Amazon DynamoDB Streams', 'Amazon DynamoDB Accelerator'],
      answerCorrect: 3
    },
    {
      question: 'What is a worker with respect to SWF? Choose one answer from the options given below.',
      answers: ['Workers are programs that interact with Amazon SWF to get tasks, process the received task, and return the results', 'Workers are ec2 instances which can create s3 buckets and process SQS messages', 'Workers are RDS instances which are used to execute tasks defined in SWF', 'Workers are the component of IIS which run on windows platform under the w3wp.exe process'],
      answerCorrect: 0
    },
    {
      question: 'Which read request in DynamoDB returns a response with the most up-to-date data, reflecting the updates from all prior write operations that were successful?',
      answers: ['Eventual Consistent Reads', 'Conditional reads for consistency', 'Strongly Consistent Reads', 'Not possible'],
      answerCorrect: 2
    }
  ],

  currentQuestion: 0,
  userScore: 0
}

//register when start button is clicked and removes div with heading
//and start button
function clickStart() {
  $('.js-startPage').on('click', 'button', function(event) {

    $('.js-startPage').remove();
    $('#question-container').removeClass('hidden');
  })
};

//register when an answer/button has been clicked/chosen by the user
function clickAnswer(chosenElement, state) {

  var chosenAnswer = $(chosenElement).val();

  //if the chosen answer is correct, then tell the user "correct", otherwise "wrong :("
  if (chosenAnswer == state.questions[state.currentQuestion].answerCorrect) {

    state.userScore += 1;
    $('.response1').text('Correct!');
  } else {
    $('.response1').text('Wrong :(');

    //add class "wrong answer" so that the button that was clicked can be
    //marked with a red colour
    $(chosenElement).addClass('wrong-answer');
  }

  //add class to the correct answer so that this can be highlighted in green
  $('.button' + state.questions[state.currentQuestion].answerCorrect).addClass('button-correct');

  //remove hover class from button so the highlighted answers will still stay red and green
  //when you hover over them
  $('button').removeClass('hover');

  //show result
  $('.result').removeClass('hidden');
  //show continue button
  $('.js-continue').removeClass('hidden');
  //disable the answer buttons so user cannot continue clicking them
  $('.js-answer').attr('disabled', true);

  return state;
}


function clickContinue(state) {
  //increment which question user is on by one when continue is clicked
  state.currentQuestion += 1;
  //hide continue button and result again, remove questions and answer
  $('.js-continue').addClass('hidden');
  $('.result').addClass('hidden');
  $('section').remove();

  //if quiz is done insert "you're done" and user's score
  //remove count and score from bottom of page
  if (state.currentQuestion > 9) {
    $('body').append('<h1 class="end">You\'re done!</h1><p class ="endScore">You scored ' + state.userScore + " out of " + state.currentQuestion);
    $('.js-count').remove();
    $('.js-score').remove();

  } else {
    //if quiz is not done insert new question and answers and update user score and question count
    $('#question-container').append("<section class = 'question-container col-8'>" +
      "<p class='question'>" + state.questions[state.currentQuestion].question + "</p><br>" +
      "<button class='button0 js-answer hover' value = '0'>" + state.questions[state.currentQuestion].answers[0] + "</button><br>" +
      "<button class='button1 js-answer hover' value = '1'>" + state.questions[state.currentQuestion].answers[1] + "</button><br>" +
      "<button class='button2 js-answer hover' value = '2'>" + state.questions[state.currentQuestion].answers[2] + "</button><br>" +
      "<button class='button3 js-answer hover' value = '3'>" + state.questions[state.currentQuestion].answers[3] + "</button>" +
      "</section>");

    $('.js-count').text("Question: " + (state.currentQuestion + 1) + "/" + state.questions.length);
    $('.js-score').text("Correct: " + state.userScore + "/" + state.currentQuestion);
  }

}

$(function() {
  clickStart();
  $('#question-container').on('click', 'button', function(event) {

    clickAnswer($(this), state);
  });

  $('.js-continue').click(function(event) {

    clickContinue(state);
  });

});
