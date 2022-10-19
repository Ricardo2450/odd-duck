'use strict'

// console.log('hi')


let myContainer = document.querySelector('section');
let resultsBtn = document.getElementById('result-button');
let results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');



let allOddDucks = [];
let timesVoted = 0;
let maxVotes = 25;
let ranDuckNum = [];
let duckResults = [];

function Duck(name, fileExtension = 'jpeg') {
  this.name = name;
  // this.fileExtension = fileExtension;
  this.src = `img/${name}.${fileExtension}`;
  this.score = 0;
  this.views = 0;
  allOddDucks.push(this);


}

// new Duck('bag');
// new Duck('banana');
// new Duck('bathroom')
// new Duck('boots')
// new Duck('breakfast')
// new Duck('bubblegum')
// new Duck('chair')
// new Duck('cthulhu')
// new Duck('dog-duck')
// new Duck('dragon')
// new Duck('pen')
// new Duck('pet-sweep')
// new Duck('scissors')
// new Duck('shark')
// new Duck('sweep', 'png')
// new Duck('tauntaun')
// new Duck('unicorn')
// new Duck('water-can')
// new Duck('wine-glass')
// console.log(wine.src);

// image2.src = allOddDucks[7];
// console.log(allOddDucks);

function selectRandomOddDuck() {
  return Math.floor(Math.random() * allOddDucks.length);
}

function renderOddDuck() {

  while (ranDuckNum.length < 6) {
    let ranNum = selectRandomOddDuck();
    if (!ranDuckNum.includes(ranNum)) {
      ranDuckNum.push(ranNum);
    }
  }


  let duck1 = ranDuckNum.shift();
  let duck2 = ranDuckNum.shift();
  let duck3 = ranDuckNum.shift();





  while (duck1 === duck2 || duck1 === duck3 || duck2 === duck3) {
    duck3 = selectRandomOddDuck();
    duck2 = selectRandomOddDuck();
  }

  image1.src = allOddDucks[duck1].src;
  image1.alt = allOddDucks[duck1].name;
  allOddDucks[duck1].views++;
  image2.src = allOddDucks[duck2].src;
  image2.alt = allOddDucks[duck2].name;
  allOddDucks[duck2].views++;
  image3.src = allOddDucks[duck3].src;
  image3.alt = allOddDucks[duck3].name;
  allOddDucks[duck3].views++;


}
function renderResults() {
  for (let i = 0; i < allOddDucks.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allOddDucks[i].name} had ${allOddDucks[i].views} views and ${allOddDucks[i].score} score.`
    results.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  timesVoted++;
  let clickedOddDuck = event.target.alt;


  for (let i = 0; i < allOddDucks.length; i++) {
    if (clickedOddDuck === allOddDucks[i].name) {
      // console.log(allOddDucks[i]);
      allOddDucks[i].score++;
      break;
    }
  }


  if (timesVoted === maxVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultsBtn.className = 'clicks-allowed';
    resultsBtn.addEventListener('click', renderResults);
    storeDucks();
    renderChart();
  }
  else {
    // getDucks();
    renderOddDuck();
  }
  // console.log(allOddDucks)
  
    
};

function storeDucks() {
  console.log(allOddDucks);
  let stringifiedOrders = JSON.stringify(allOddDucks);
  localStorage.setItem('ducks', stringifiedOrders);
}



function getDucks() {
  let potentialDucks = localStorage.getItem('ducks');
  if (potentialDucks) {
    let parsedDucks = JSON.parse(potentialDucks);
    allOddDucks = parsedDucks;
    console.log(allOddDucks);

  }
  else {
    new Duck('bag');
    new Duck('banana');
    new Duck('bathroom')
    new Duck('boots')
    new Duck('breakfast')
    new Duck('bubblegum')
    new Duck('chair')
    new Duck('cthulhu')
    new Duck('dog-duck')
    new Duck('dragon')
    new Duck('pen')
    new Duck('pet-sweep')
    new Duck('scissors')
    new Duck('shark')
    new Duck('sweep', 'png')
    new Duck('tauntaun')
    new Duck('unicorn')
    new Duck('water-can')
    new Duck('wine-glass')
  }

}





function renderChart() {
  let oddDuckNames = [];
  let oddDuckViews = [];
  let oddDuckScore = [];
  for (let i = 0; i < allOddDucks.length; i++) {
    oddDuckNames.push(allOddDucks[i].name);
    oddDuckViews.push(allOddDucks[i].views);
    oddDuckScore.push(allOddDucks[i].score);
  }




  const data = {
    labels: oddDuckNames,
    datasets: [
      {
        label: '# of views',
        data: oddDuckViews,
        backgroundColor: [
          // 'rgba(255, 51, 240, 0.5)',
          'rgba(0, 181, 204, .4)'
        ],
        borderColor: [
          'rgba(0, 181, 204, .4)'

        ],
        borderWidth: 1
      },

      {
        label: '# of votes',
        data: oddDuckScore,
        backgroundColor: [
          'rgba(255, 0, 0, 1)'
        ],
        borderColor: [
          'rgba(255, 0, 0, 1)'
        ],
        borderWidth: 1
      }
    ]
  };



  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        x: {
          stacked: true
        }
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}


myContainer.addEventListener('click', handleClick);
getDucks();
renderOddDuck();






