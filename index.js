let years_and_cpi = {
             
    '1964' : 0.001310109    ,
    '1965' : 0.001656565,
    '1966' : 0.001875859,
    '1967' : 0.001717865 ,
    '1968' : 0.001853486,
    '1969' : 0.001989107,
    '1970' : 0.002049383,
    '1971' : 0.00224528,
    '1972' : 0.002471315,
    '1973' : 0.002908315,
    '1974' : 0.00343573,
    '1975' : 0.004460422	,
    '1976' : 0.006961874,
    '1977' : 0.015068992,
    '1978' : 0.026083169,
    '1979' : 0.040283182,
    '1980' : 0.060453027,
    '1981' : 0.130882982,
    '1982' : 0.160064085,
    '1983' : 0.356742052,
    '1984' : 0.498244906,
    '1985' : 0.549591239,
    '1986' : 0.684600614 ,
    '1987' : 0.957174813    ,
    '1988' : 1.257337824,
    '1989' : 1.574484845,
    '1990' : 2.1611232,
    '1991' : 2.550804812,
    '1992' : 2.807316722,
    '1993' : 3.508018553,
    '1994' : 4.380471728,
    '1995' : 6.985168277,
    '1996' : 10.23753385	   ,
    '1997' : 13.09229153,
    '1998' : 15.00693006,
    '1999' : 16.86909033,
    '2000' : 21.11895726,
    '2001' : 28.0682365   ,
    '2002' : 32.2268938  ,
    '2003' : 40.82340152  ,
    '2004' : 45.97718208 ,
    '2005' : 52.92809786  ,
    '2006' : 58.7052897  ,
    '2007' : 65.0059688  ,
    '2008' : 75.74634813  ,
    '2009' : 90.3280613  ,
    '2010' : 100 ,
    '2011' : 108.7268368,
    '2012': 116.4750918,
    '2013' : 130.0633  ,
    '2014' : 150.2096058 ,
    '2015' : 175.9705074,
    '2016':206.6855167,
    '2017':232.2564866,
  '2018':259.886,
  '2019':278.452,
  '2020':305.983:
};
let form = jQuery('#calculator');
let results = jQuery('#results');
let year1_select = jQuery('#year1');
let year2_select = jQuery('#year2');


// This for loop adds the years that are in the years and cpi array
for (year in years_and_cpi) {
    year1_select.append(
        jQuery('<option value="' + year + '">' + year + '</option>')
    );
    year2_select.append(
        jQuery('<option value="' + year + '">' + year + '</option>')
    );
}
form.on('submit', function() {
        // clear results
    results.html('');
    let val = parseFloat(jQuery('#amount').val());
    if ( !is_valid_cedi_amount(val) ) {
        results.append('<h3 class="error">Let\'s try to keep this at numerals, okay? Maybe a decimal point.</h3>');
        return false;
    }
    let year1 = year1_select.find('option:selected').val();

    let year2 = year2_select.find('option:selected').val();
    let adjusted_selection = get_adjusted_cedis(val, year1, year2);

    results.append(jQuery('<h1>GH₵' + val +
        ' in ' + year1 + ' cedis, is worth  GH₵'+adjusted_selection+' in '+year2+'</h1>'));
    let inflation_rate = get_inflation_rate(val,year1,year2);
    let list = jQuery('<ul class="list-group"></ul>');
    for (adjusted_year in years_and_cpi) {
        let adjusted_amount = get_adjusted_cedis(val, year1, adjusted_year);
        list.append(jQuery('<li class="list-group-item">GH₵' + adjusted_amount
            + ' in ' + adjusted_year + '</li>'));
    }
    results.append(list);
    results.append(jQuery('<h1>There is an inflation rate between this period of '+inflation_rate+'%</h1>'));

    return false;
});
function is_valid_cedi_amount(amount) {
    if (!amount || amount === NaN) {
        return false;
    }
    return true
}
function get_adjusted_cedis(amount, from, to) {
    let from_adjustment = years_and_cpi[from];
    console.log(from_adjustment);
    let to_adjustment = years_and_cpi[to];
    console.log(to_adjustment);
    let division = from_adjustment/to_adjustment;
    console.log(division);
    let new_amount = (division * amount).toFixed(2);
    return new_amount;
}

function get_inflation_rate(amount, from, to){
    let from_adjustment = years_and_cpi[from];
    console.log(from_adjustment);
    let to_adjustment = years_and_cpi[to];
    console.log(to_adjustment);
    let difference = from_adjustment-to_adjustment;
    console.log(difference);
    let rate = ((to_adjustment-from_adjustment )/ from_adjustment)*100;
    console.log(rate);
    return rate.toFixed(3);
}
