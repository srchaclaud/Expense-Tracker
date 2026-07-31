function dashboardData(){

  let sheet = getSheet();

  let data = sheet.getDataRange().getValues();

  data.shift();

  let total = 0;

  let today = 0;

  let categories = {};

  let current = Utilities.formatDate(new Date(),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd");

  data.forEach(r=>{

    let date = Utilities.formatDate(new Date(r[0]),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd");

    let amount = Number(r[3]);

    total += amount;

    if(date==current){
      today += amount;
    }

    if(categories[r[1]]){
      categories[r[1]] += amount;
    }else{
      categories[r[1]] = amount;
    }

  });

  return {
    total:total,
    today:today,
    categories:categories
  };

}
