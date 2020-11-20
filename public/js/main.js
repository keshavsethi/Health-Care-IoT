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
  let time = [];
  let data_count=0;
  firebase.database().ref('data/time').limitToLast(100).on('value', ts_measures => {
    ts_measures.forEach(ts_measure => {
    time.push(ts_measure.val());
    data_count++;
    });
    document.getElementById("data_head").innerHTML = data_count;

});  
let oxygen;
firebase.database().ref('data/oxygen').on('value', ts_measures => {
    ts_measures.forEach(ts_measure => {
    oxygen = ts_measure.val();
    });
    document.getElementById("o2_head").innerHTML = oxygen;
    var opts = {
        lines: 12, // The number of lines to draw
        angle: 0, // The span of the gauge arc
        lineWidth: 0.46, // The line thickness
        pointer: {
          length: 0.68, // The radius of the inner circle
          strokeWidth: 0.035, // The thickness
          color: '#424242' // Fill color
        },
        limitMax: false,     // If true, the pointer will not go past the end of the gauge
        colorStart: '#363636',   // Colors
        colorStop: '#03A9F4',    // just experiment with them
        strokeColor: '#f5f5f5',
        // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true     // High resolution support
      };
      console.log(document.getElementById('maxVal').textContent);
      var target = document.getElementById('canvas-preview'); // your canvas element
      var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
      gauge.maxValue = document.getElementById('maxVal').textContent; // set max gauge value
      gauge.animationSpeed = 28; // set animation speed (32 is default value)
      gauge.set((oxygen%90)*10);
      gauge.setTextField(document.getElementById("preview-textfield"));
      
      

});  


// temp reference 
  firebase.database().ref('data/temp').limitToLast(100).on('value', ts_measures => {
    let values = [];
    let ids = [];
    ts_measures.forEach(ts_measure => {
    values.push(ts_measure.val());
    });
    for(i=1;i<=values.length;i++){
        ids[i]=i;
    }
    // loop onn values and push in new array if more than some threshold!!
    // and make a table with ids, temp and pulse
    // new page alert.html 
    // new js file ....

    if(values[18] > 39){
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
    document.getElementById("temprature_head").innerHTML = values[18];
    // Get a reference to the DOM node that welcomes the plot drawn by Plotly.js:
    for(i=0;i<values.length;i++){
        if(values[i] > 30 && values[i] < 32.9 ){
            count1++;
        }
        else if(values[i] > 32.9 && values[i] < 34 ){
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
        labels: ['30-32.9', '32.9-34', '>34'],
        type: 'pie'
      }];
      
      var layout1 = {
        height: 300,
        width: 300
      };
      
      Plotly.newPlot(mytempp, data1, layout1, { responsive: true });
    // We generate x and y data necessited by Plotly.js to draw the plot
    // and its layout information as well:
    // See https://plot.ly/javascript/getting-started/
    const data = [{
        x: time,
        y: values,
    }];
  
    const layout = {
        height: 300,
        width: 700,
        xaxis: {
            title:'Time',
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



  


  firebase.database().ref('data/pulse').limitToLast(80).on('value', ts_measures => {
    let values = [];
    let ids = [];
    ts_measures.forEach(ts_measure => {
    values.push(ts_measure.val());
    });
    console.log(values);
    if(values[90] > 78){
        console.log("email check");
        Email.send({ 
            Host: "smtp.gmail.com", 
            Username: "healthcare.group8@gmail.com", 
            Password: "keshavsethi", 
            To: 'keshav.sethi0004@gmail.com', 
            From: "healthcare.group8@gmail.com", 
            Subject: "Alert!!", 
            Body: "Hope you are well, your Pulse bpm crossed thershold value, Please check!!", 
        });

    }
    document.getElementById("pulse_head").innerHTML = values[79];

   $('.progress-bar').css('width', (values[79]%70)*10+'%').attr('aria-valuenow', (values[79]%70)*10)
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
        labels: ['75-80', '80-85', '>85'],
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
        x: time,
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
            title: 'Pulse Oximeter',
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











  