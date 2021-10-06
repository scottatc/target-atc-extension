"use strict";

const delay = ms => new Promise(res => setTimeout(res, ms));

let prodLink = window.location.href;

async function targetATC() {
  let prodId = prodLink.split('A-').pop().split('#')[0];
  console.log('Initiated carting...');

  for (let i = 0; i < 5; i++) {
    let success = false;
    await fetch("https://carts.target.com/web_checkouts/v1/cart_items?field_groups=CART%2CCART_ITEMS%2CSUMMARY%2CFINANCE_PROVIDERS&key=feaf228eb2777fd3eee0fd5192ae7107d6224b39", {
      "headers": {
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7",
        "content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-application-name": "web"
      },
      "referrer": window.location.href,
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "{\"cart_type\":\"REGULAR\",\"channel_id\":\"10\",\"shopping_context\":\"DIGITAL\",\"cart_item\":{\"tcin\":\"" + prodId + "\",\"quantity\":1,\"item_channel_id\":\"10\"}}",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(function (response) {
      let status = response.status;

      if (status == 424) {
        console.log("Trying to ATC [" + (i + 1) + "/5]");
        return;
      } else if (status == 201) {
        success = true;
      }
    });

    if (success) {
      window.location.href = "https://www.target.com/co-review";
      break;
    }
  }
}

if (prodLink.includes('https://www.target.com/p/')) {
  targetATC();
}