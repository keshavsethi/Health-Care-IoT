const config = {
    apiKey: "AIzaSyCqOdIjUsNL95Uc00JBmhUWgHXtWCtNTLU",
    authDomain: "health-care-iot-534c9.firebaseapp.com",
    databaseURL: "https://health-care-iot-534c9.firebaseio.com",
    projectId: "health-care-iot-534c9",
    storageBucket: "health-care-iot-534c9.appspot.com",
    messagingSenderId: "214130811754",
    appId: "1:214130811754:web:a15dbec4a135da9b3d7b13",
    measurementId: "G-3ZLX17QWM7"
  };
  firebase.initializeApp(config);
  

  let count1=0;
  let count2=0;
  let count3=0;

  console.log("check");
  firebase.database().ref('data/temp').limitToLast(20).on('value', ts_measures => {
    let values = [];
    let ids = [];
    ts_measures.forEach(ts_measure => {
    values.push(ts_measure.val());
    });
    for(i=1;i<=values.length;i++){
        ids[i]=i;
    }
    console.log(values);
    let len = values.length;
    console.log(values[len-1] );
    if(values[len-1] > 100){
        console.log("email check");
        Email.send({ 
            Host: "smtp.gmail.com", 
            Username: "healthcare.group8@gmail.com", 
            Password: "keshavsethi", 
            To: 'keshav.sethi0004@gmail.com', 
            From: "healthcare.group8@gmail.com", 
            Subject: "Alert!!", 
            Body: "Hope you are well, your temptature crossed thershold value, Please check!!", 
        });

    }
    document.getElementById("temprature_head").innerHTML = values[len-1];
    // Get a reference to the DOM node that welcomes the plot drawn by Plotly.js:
    for(i=0;i<values.length;i++){
        if(values[i] > 35 && values[i] < 36 ){
            count1++;
        }
        else if(values[i] > 36 && values[i] < 38 ){
            count2++;
        }
        else {
            count3++;
        }
    }
    myPlotDiv = document.getElementById('myPlot');
    mytempp = document.getElementById('mytemp');
    var data1 = [{
        values: [count1, count2, count3],
        labels: ['35-36', '36-38', '>38'],
        type: 'pie'
      }];
      
      var layout1 = {
        height: 300,
        width: 300
      };
      
      Plotly.newPlot(mytempp, data1, layout1);
    // We generate x and y data necessited by Plotly.js to draw the plot
    // and its layout information as well:
    // See https://plot.ly/javascript/getting-started/
    const data = [{
        x: ids,
        y: values
    }];
  
    const layout = {
        height: 300,
        width: 700,
        xaxis: {
            linecolor: 'black',
            linewidth: 2
        },
        yaxis: {
            title: 'Temprature',
            titlefont: {
                family: 'Times New Roman',
                size: 14,
                color: '#000'
            },
            linecolor: 'black',
            linewidth: 2,
        },
        margin: {
            r: 50,
            pad: 0
        }
    }
    // At last we plot data :-)
    Plotly.newPlot(myPlotDiv, data, layout, { responsive: true });
  });



  


  firebase.database().ref('data/pulse').limitToLast(20).on('value', ts_measures => {
    let values = [];
    let ids = [];
    ts_measures.forEach(ts_measure => {
    values.push(ts_measure.val());
    });
    for(i=1;i<=values.length;i++){
        ids[i]=i;
    }
    console.log(values);
    let len = values.length;
    console.log(values[len-1] );
    if(values[len-1] > 100){
        console.log("email check");
        Email.send({ 
            Host: "smtp.gmail.com", 
            Username: "healthcare.group8@gmail.com", 
            Password: "keshavsethi", 
            To: 'keshav.sethi0004@gmail.com', 
            From: "healthcare.group8@gmail.com", 
            Subject: "Alert!!", 
            Body: "Hope you are well, your temptature crossed thershold value, Please check!!", 
        });

    }
    document.getElementById("pulse_head").innerHTML = values[len-1];

    $('.progress-bar').css('width', values[len-1]+'%').attr('aria-valuenow', values[len-1])
    for(i=0;i<values.length;i++){
        if(values[i] > 75 && values[i] < 80 ){
            count1++;
        }
        else if(values[i] > 80 && values[i] < 85 ){
            count2++;
        }
        else {
            count3++;
        }
    }
    // Get a reference to the DOM node that welcomes the plot drawn by Plotly.js:
    myPlotDiv = document.getElementById('pulseplot');
    mytempp = document.getElementById('mypulse');
    var data1 = [{
        values: [count1, count2, count3],
        labels: ['35-36', '36-38', '>38'],
        type: 'pie'
      }];
      
      var layout1 = {
        height: 300,
        width: 300
      };
      
      Plotly.newPlot(mytempp, data1, layout1);
    // We generate x and y data necessited by Plotly.js to draw the plot
    // and its layout information as well:
    // See https://plot.ly/javascript/getting-started/
    const data = [{
        x: ids,
        y: values
    }];
  
    const layout = {
        height: 300,
        width: 700,
        xaxis: {
            linecolor: 'black',
            linewidth: 2
        },
        yaxis: {
            title: 'Temprature',
            titlefont: {
                family: 'Times New Roman',
                size: 14,
                color: '#000'
            },
            linecolor: 'black',
            linewidth: 2,
        },
        margin: {
            r: 50,
            pad: 0
        }
    }
    // At last we plot data :-)
    Plotly.newPlot(myPlotDiv, data, layout, { responsive: true });
  });

let data_count =0;
  firebase.database().ref('data/temp').on('value', ts_measures => {

    ts_measures.forEach(ts_measure => {
    data_count++;
    });
    document.getElementById("data_head").innerHTML = data_count;

  });

