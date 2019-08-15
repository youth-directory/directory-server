/**
 * @function mapJsonData
 * @param data: function takes json data modelled after survey, parses into readable,
 *  categorized strings for database storage and query
 * 
 * @returns [array]<objects> - each object being one organization
 */

module.exports.mapJsonData = (data) => {
    return data.map((e)=> {
  
      const programOfferings = Object.keys(e).reduce((ac, el)=>{
        let fieldNum = el.slice(-2);
        fieldNum > 12 && fieldNum < 33 && e[el] ? ac.push(e[el].replace(/\n/gi, ' ')) : null;
        return ac;
      }, []);
  
      if(e["Which of the following types programs"]["services do you offer? (Check all that apply):"]){
          programOfferings.unshift(e["Which of the following types programs"]["services do you offer? (Check all that apply):"])
      };
  
      const orgHoursOperation = Object.keys(e).reduce((ac, el)=>{
        if(el === "FIELD34" || el === "FIELD35"){
          e[el] ? ac.push(e[el]) : null;
        }
        return ac;
      }, []);
  
      if(e["Hours of Operation (check all that apply):"]){
        orgHoursOperation.unshift(e["Hours of Operation (check all that apply):"])
      }
  
      const orgNonMainLocations = Object.keys(e).reduce((ac, el)=>{
        let fieldNum = el.slice(-3);
        if(fieldNum[0] === 'D' && fieldNum.slice(1) > 36 && fieldNum.slice(1) < 41 && e[el] ){
          ac.push(e[el].replace(/\n/gi, ' '));
        }
        return ac;
      }, [])
  
      if(e["If you offer programming at locations different from the organizational address above, please list them."]){
        orgNonMainLocations.unshift(e["If you offer programming at locations different from the organizational address above, please list them."].replace(/\n/gi, ' '));
      }
  
      const org_schools_partnered_with = Object.keys(e).reduce((ac, el)=>{
        let fieldNum = el.slice(-3);
        if(fieldNum[0] === 'D' && fieldNum.slice(1) > 41 && e[el]){
          ac.push(e[el].replace(/\n/g, ' '));
        }
        else if(fieldNum > 99 && fieldNum < 120 && e[el]){
          ac.push(e[el]);
        }
        return ac;
      }, [])
      
      if(e["Does this program partner with any schools? (Check all that apply)"]){
        org_schools_partnered_with.unshift(e["Does this program partner with any schools? (Check all that apply)"]);
      }
  
      const org_youth_meet_frequency = Object.keys(e).reduce((ac, el)=>{
        let fieldNum = el.slice(-3);
        if(fieldNum > 120 && fieldNum < 124 && e[el]){
          ac.push(e[el]);
        }
        return ac;
      }, [])
  
      if(e["How often does the program meet"]["engage children and youth? (Check all that apply)"]){
        org_youth_meet_frequency.unshift(e["How often does the program meet"]["engage children and youth? (Check all that apply)"])
      }
  
      const org_extracurricular_times_offered = Object.keys(e).reduce((ac, el)=>{
        let fieldNum = el.slice(-3);
        if(fieldNum > 124 && fieldNum < 128 && e[el]){
          ac.push(e[el]);
        }
        return ac;
      }, [])
  
      if(e["Do you offer programming during any of these times? (Check all that apply)"]){
        org_extracurricular_times_offered.push(e["Do you offer programming during any of these times? (Check all that apply)"]);
      }
  
      const org_additional_info = e["Please include any other information you would like to share about your programs, including additional program locations you have not yet listed:"] ?
         e["Please include any other information you would like to share about your programs, including additional program locations you have not yet listed:"].replace(/\n/gi, ' ') : null;
  
        const org_parent_involvement_required = e["Is parent involvement required?"] ? e["Is parent involvement required?"] : null;
      
        const org_program_cost = e["Do the programs and services require a cost to participate?"] ? e["Do the programs and services require a cost to participate?"] : null;
     
  
      const org_genders_possible_to_serve = Object.keys(e).reduce((ac, el)=>{
        if(el === "FIELD139" || el === "FIELD140" || el === "FIELD141" || el === "FIELD142" || el === "FIELD143"){
          e[el] ? ac.push(e[el]) : null;
        }
        return ac;
      }, []);
  
      const org_service_populations = Object.keys(e).reduce((ac, el)=>{
        if(el === "FIELD139" || el === "FIELD140" || el === "FIELD131" || el === "FIELD132" || el === "FIELD133" || el === "FIELD134" || el === "FIELD135" || el === "FIELD136" || el === "FIELD137"){
          e[el] ? ac.push(e[el].replace(/\n/gi, ' ')) : null;
        }
        return ac;
      }, []);
  
      const org_name = e["Organization Name:"] ? e["Organization Name:"].replace(/\n/gi, ' ') : 'Organization name not provided.'
  
      return {
           surveyee_name: e["*Your name:"],
           surveyee_title: e["*Your title:"],
           surveyee_email: e["*Your email:"],
           org_name,
           org_desc: e["Organization Description (maximum five sentences):"].replace(/\n/gi, ' '),
           org_addr: e["Address:"].replace(/\n/g, ' '),
           org_phone: e["Phone Number:"].replace(/\n/gi, ' '),
           org_website: e["Website:"],
           org_director_name: e["*CEO"]["Executive Director Name:"],
           org_director_phone: e["*CEO"]["Executive Director Phone Number:"],
           org_director_email: e["*CEO"]["Executive Director Email:"],
           program_offerings: programOfferings,
           org_hours_of_operation: orgHoursOperation,
           org_non_main_locations: orgNonMainLocations,
           org_schools_partnered_with,
           org_youth_meet_frequency,
           org_extracurricular_times_offered,
           org_monthly_capacity: e["Up to how many young people does each program have the capacity to serve on a monthly basis:"].replace(/\n/gi, ' '),
           org_eligibility_reqs: e["What are the eligibility requirements?"].replace(/\n/gi, ' '),
           org_provisions: e["Does your organization provide any of the following? (Check all that apply)"],
           org_service_populations,
           org_genders_possible_to_serve,
           org_parent_involvement_required,
           org_program_cost,
           org_additional_info,
      }
    });
  }