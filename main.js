
var submit = document.getElementById('submit');

submit.addEventListener('click', function() {

    function capitaliseFirstLetter(string) {
       var answer = string.charAt(0).toUpperCase() + string.slice(1);
       return answer
      }

    var input1 = document.getElementById("input1");
    var name1 = input1.value;
    var input2 = document.getElementById("input2");
    var name2 =input2.value

    var nickName = capitaliseFirstLetter(name1);
    var lastName = capitaliseFirstLetter(name2);

    console.log(lastName);
    var url = "https://congress.api.sunlightfoundation.com/legislators?nickname=" + nickName + "&last_name=" + lastName + "&apikey=65d321a542094c05805dc086a182584c";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener('load', function(e) {

      var data = xhr.responseText;
      var parsed = JSON.parse(data);
      console.log(parsed);
      var info = parsed.results[0].twitter_id;
      var bio = parsed.results[0].bioguide_id;
      var congName = parsed.results[0].title + " " + parsed.results[0].nickname + " " + parsed.results[0].last_name + " - " + parsed.results[0].party + "-" + parsed.results[0].state;
      var chamber = parsed.results[0].chamber;
      var chamberInfo = capitaliseFirstLetter(chamber);
      var websiteURL = parsed.results[0].website;
      console.log(bio);



      function findBills(bioguide_id) {
        var preBillInfo = []
        var url2 = "https://congress.api.sunlightfoundation.com/bills?sponsor_id="+ bioguide_id +"&apikey=65d321a542094c05805dc086a182584c"
        console.log(url2);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url2);
        xhr.addEventListener('load', function(e) {

          var data2 = xhr.responseText;
          var parsed2 = JSON.parse(data2);
          console.log(parsed2)
          var results2 = parsed2.results;
          console.log("results2:" + results2.length)
          results2.forEach(function(bill) {
            var billId = bill.bill_id;
            var billTitle = bill.short_title
          if (billTitle === null) {
            var bills = document.getElementById("bills");
            var li = document.createElement("li");
            li.innerText = billId + ": No Short Title";
            bills.appendChild(li);
          } else {
            var bills = document.getElementById("bills");
            var li = document.createElement("li");
            li.innerText = billId + ": " + billTitle;
            bills.appendChild(li);
          }
          })
        })
        xhr.send();
      }

      var infoSection = document.getElementById("info");
      var name = document.getElementById("name");
      name.innerText = congName;
      infoSection.appendChild(name);

      var twitter = document.getElementById("twitter");
      twitter.innerText = "Twitter handle: @" + info;
      infoSection.appendChild(twitter);

      var chamber = document.getElementById("chamber");
      chamber.innerText = "Chamber: " +chamberInfo;
      infoSection.appendChild(chamber);

      var website = document.getElementById("website");
      website.innerText = "Website: " + websiteURL;
      website.setAttribute('href', websiteURL)
      infoSection.appendChild(website);

      var bills = document.getElementById("bills");
      var billsHeader = document.getElementById("billsHeader");
      billsHeader.innerText = "Bills Sponsored:";
      bills.appendChild(billsHeader);



      findBills(bio)
    })
    xhr.send();
  });
