
const express = require('express');
// const {  fetch } = require('node-fetch');
const app = express();

app.use(express.json());
//Routes..
let windowSize = 5;
const generateEvenNumbers = (windowSize) => {

   let count = 0;
    const evenNumbers = [];
  while(count < windowSize){
      let val = Math.ceil(Math.random()* 100);
      if(val % 2 === 0){
          evenNumbers.push(val);
          count++;
      }
  }
  return evenNumbers
}

const generatePrimeNumbers = (windowSize) => {
  const primeNumbers = [];
  let num = 0; // Start checking for primes from 2
  while (num < windowSize) {
    let val = Math.ceil(Math.random()* 1000);
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(val); i++) {
      if (val % i == 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime && val!=0&&val!=1) {
     // console.log(val);
      primeNumbers.push(val);
      num++;
    }
    
  }
  return primeNumbers;
}

const generateRandomNumbers = (windowSize) => {
  const randomNumbers = [];
  for (let i = 0; i < windowSize; i++) {
    let val = Math.ceil(Math.random() * 1000);
    randomNumbers.push(val);
  }
  return randomNumbers;
}

function findAverage(numbers) {
  if (numbers.length == 0) return 0;
  let sum = 0;
  for(let i=0;i<numbers.length;i++){
    sum += numbers[i];
  }
  return sum / numbers.length;
}


function isFibonnaci(num) {
  let a = 0, b = 1, c = 0;
  if (num === 0 || num === 1) return true;
  
  while (c < num) {
    c = a + b;
    a = b;
    b = c;
  }
  
  return c === num;
}

const generateFibionacciNumbers = (windowSize) => {
  //generate random fibonacci
  if (windowSize <= 0) return [];
  const fibonacciNumbers = [];
  
  let count = 0;
  while(count < windowSize){
    let val = Math.ceil(Math.random() * 1000);
    if(isFibonnaci(val)){
      fibonacciNumbers.push(val);
      count++;
    }
  }
  
  return fibonacciNumbers;
}

app.get("/numbers/f", (req,res) => {
    
    fetch("http://20.244.56.144/evaluation-service/fibonacci")
    .then(responce => responce.json())
    .then(data => {
      let nums = generateFibionacciNumbers(windowSize)
      let obj = {
        "numbers" : nums,
      }
        res.statusCode(200).send({
          "windowPrevState" : [],
          "windowCurrState" : [],
          "numbers" : obj.numbers,
          "avg" : findAverage(obj.numbers),
          
        });
    })

})

app.get("/numbers/e", (req,res) => {

    fetch("http://20.244.56.144/evaluation-service/even")
    .then(responce => responce.json())
    .then(data => {
      let nums = generateEvenNumbers(windowSize)
      let obj = {
        "numbers" : nums,
      }
        res.send({
          "windowPrevState" : [],
          "windowCurrState" : [],
          "numbers" : obj.numbers,
          "avg" : nums.reduce((a, b) => a + b, 0) / nums.length,
          
        });
    })

})


app.get("/numbers/p", (req,res) => {
    fetch("http://20.244.56.144/evaluation-service/even")
    .then(responce => responce.json())
    .then(data => {
      let nums = generatePrimeNumbers(windowSize)
      let obj = {
        "numbers" : nums,
      }
        res.send({
          "windowPrevState" : [],
          "windowCurrState" : [],
          "numbers" : obj.numbers,
          "avg" : nums.reduce((a, b) => a + b, 0) / nums.length,
          
        });
    })

})

app.get("/numbers/r", (req,res) => {
    fetch("http://20.244.56.144/evaluation-service/random")
    .then(responce => responce.json())
    .then(data => {
      let nums = generateRandomNumbers(windowSize)
      let obj = {
        "numbers" : nums,
      }
        res.statusCode(200).send({
          "windowPrevState" : [],
          "windowCurrState" : [],
          "numbers" : obj.numbers,
          "avg" : nums.reduce((a, b) => a + b, 0) / nums.length,
        });
    })

})


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
})