import React,{useState} from "react";
import "./SignUp.css";
import "./Login.css";
import {useTranslation} from "react-i18next";
import i18n from  "./i18n";


const SignUp=()=>{

    const {t,i18n}=useTranslation();
    const [input,setInput]=useState({email:"",password:"",firstname:"",surname:"",mobemail:"",newpassword:""});
    const [inputClass,setInputClass]=useState({gender:false,email:false,pronoun:false,password:false,firstname:false,surname:false,mobemail:false,password:false});
    const [changeClassForDate,setChangeClassForDate]=useState(false);
    const monthNames = ["Day","jan", "feb", "march", "april", "may", "june","july", "august", "sep", "oct", "nov", "dec"];
    const d=new Date();
    const [day,setDay]=useState(d.getDate());
    const [month,setMonth]=useState(t(monthNames[d.getMonth()+1].toString()));
    const [year,setYear]=useState(d.getFullYear());
    const [pronoun,setPronoun]=useState("Select your pronoun");
    const [gender,setGender]=useState("");

     
    const [changeClass,setChangeClass]=useState("main__div");

    const changeGender=(e)=>{
        
        if(!(e.target.value)){
            setInputClass({
                ...inputClass,
                "gender":true
            })
        }
        else{
            console.log(e.target.value)
            setInputClass({
                ...inputClass,
                "gender":false
            })
        }
        setGender(e.target.value);

    }

    const changeLanguage=(ln)=>{
        i18n.changeLanguage(ln)
        if(ln=='ur'){
            setChangeClass("main__div1")
        }
        else{
            setChangeClass("main__div");
        }
       
    }
    const signUpPage=()=>{
        let store=true;
        for(let key in inputClass){
            if(inputClass[key]){
                console.log("inputClassStore",key)
                store=false;
                break;
            }
        }
        if(changeClassForDate){
            store=false;
        }
        let data={}
        for(let key in input){
            if(!(input[key]) && !(key.toString()=="email"|| key.toString()=="password" || key.toString()=="isMail")){
                console.log("He", key)
                store=false;
                data[key]=true;
            }
            
        }
        if(!gender){
            data["gender"]=true
        }
        setInputClass(data)
        if(day==d.getDate() && month==t(monthNames[d.getMonth()+1].toString()) && year==d.getFullYear()){
            store=false;
            console.log("Dateestore")
            setChangeClassForDate(true);
        }
       
        if(input.newpassword.length<8){
            store=false;
            setInputClass({
                ...inputClass,
                "password":true
            })
        }
        console.log(store);
        if(store){
            let validemailmob=true;
            let mobile=false;
            let email=false;
            let mobemail=input.mobemail;
            console.log(mobemail)
            console.log("inside store")
            if(mobemail.indexOf('@')!=-1){
                let index=mobemail.lastIndexOf('.');
                console.log(index-mobemail.indexOf('@'))
                if(index-mobemail.indexOf('@')>=3){
                    if(mobemail.length-index>=2){
                        validemailmob=true;
                        email=true;
                    }
                    else{
                        validemailmob=false;
                    }
                }
                else{
                    validemailmob=false
                }
            }
            else{
                mobile=true;
               for(let k=0;k<mobemail.length;k++)
               {
                   if(!(mobemail.charAt(k)>='0' && mobemail.charAt(k)<='9')){
                    validemailmob=false;
                    break;
                   }
               }
               if(mobemail.length!=10){
                   validemailmob=false;
               }

            }
            console.log(validemailmob)
            input.isMail=email;
            if(validemailmob){
                fetch("https://manasa-facebook-clone.herokuapp.com/",{
                    method:"POST",
                    body:JSON.stringify(input),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{
                    console.log(data)
                })
            }
        }
    }
    const changeInput=(e)=>{
        if(e.target.value){
            // console.log("Hello")
            setInputClass({
                ...inputClass,
                [e.target.name]:false
            })
        }
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    const changeClassName=(e)=>{
        // console.log("Hello",e.target.name)
        setInputClass({
            ...inputClass,
            [e.target.name]:true
        })
    }
    const customPronoun=(e)=>{
        

    }
    const loginPage=(e)=>{
        e.preventDefault();
        let validemailmob=true;
        let email=false;
        let mobile=false;
        let mobemail=input.email;
        console.log(mobemail)
        console.log("inside store")
        if(mobemail.indexOf('@')!=-1){
            let index=mobemail.lastIndexOf('.');
            console.log(index-mobemail.indexOf('@'))
            if(index-mobemail.indexOf('@')>=3){
                if(mobemail.length-index>=2){
                    validemailmob=true;
                    email=true;
                    
                }
                else{
                    validemailmob=false;
                }
            }
            else{
                validemailmob=false
            }
        }
        else{
            mobile=true;
           for(let k=0;k<mobemail.length;k++)
           {
               if(!(mobemail.charAt(k)>='0' && mobemail.charAt(k)<='9')){
                validemailmob=false;
                break;
               }
           }
           if(mobemail.length!=10){
               validemailmob=false;
           }

        }
        console.log(validemailmob)
        if(validemailmob){
            fetch("https://manasa-facebook-clone.herokuapp.com/login1",{
                method:"POST",
                body:JSON.stringify(input),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                alert(data.message)
            })
        }
        
    

    }
    const changeDateClass=(e)=>{
        // if(d.getFullYear()-year<=5){
        //     setChangeClassForDate(true)
        // }
        // else{
        //     setChangeClassForDate(false)
        // }
    }
    const changeDay=(e)=>{
        if(d.getFullYear()-year<=5){
            setChangeClassForDate(true)
        }
        else{
            setChangeClassForDate(false)
        }
        setDay(e.target.value);
    }
    const changeMonth=(e)=>{
        if(d.getFullYear()-year<=5){
            setChangeClassForDate(true)
        }
        else{
            setChangeClassForDate(false)
        }
        setMonth(e.target.value);
    }
    const changeYear=(e)=>{
        if(d.getFullYear()-e.target.value<=5){
            setChangeClassForDate(true)
        }
        else{
            setChangeClassForDate(false)
        }
        setYear(e.target.value);
    }
    const changePronoun=(e)=>{
        if(e.target.value.toString()=="Select your pronoun")
        {
            setInputClass({
                ...inputClass,
                "pronoun":true
            })
        }
        else{
            setInputClass({
                ...inputClass,
                "pronoun":false
            })
        }
        setPronoun(e.target.value)
    }
    return (
        <>
        <div className="header">
            <h1 className="h1">
                <span>facebook</span></h1>
            <table cellSpacing="0" role="presentation" className="headerForm">
                <tbody>
                <tr>
                    <td className="label"><label for="email">{t("emailorphone")}</label></td>
                    <td className="label2"><label for="pass">{t("pass")}</label></td>
                </tr>
                <tr>
                    <td><input type="text" name="email" id="email" value={input.email}  onChange={changeInput}></input></td>
                    <td><input type="password" name="password" id="password" value={input.password} onChange={changeInput}></input></td>
                    <td></td>
                    <td><button className="login" onClick={loginPage}>{t("login")}</button></td>
                </tr>
                <tr>
                    <td></td>
                    <td ><a href="#" className="label3">{t("forgottenaccount")}</a></td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className="belowHeader">
        <div className="createAccount">
        Create a new account
        </div>

        <div className="belowCreate">{t("itsQuickEasy")}</div></div>
        <div className="formInput">
            <input type="text" className={inputClass.firstname?"firstname_around":"firstName"} onFocus={changeClassName} name="firstname" id="firstName" placeholder={t("firstname")} value={input.firstname} onChange={changeInput}></input>
            <input type="text" className={inputClass.surname?"firstname_around1":"firstName1"} onFocus={changeClassName} name="surname" id="surName" placeholder={t("lastname")} value={input.surname} onChange={changeInput}></input><br></br>
            <input  type="text" className={inputClass.mobemail?"mobemail1":"mobemail"} onFocus={changeClassName} name="mobemail" id="mobemail" placeholder={t("mobileoremail")} value={input.mobemail} onChange={changeInput}></input><br></br>
            <input type="password" className={inputClass.password?"password1":"password"} onFocus={changeClassName} name="newpassword" id="newpassword" placeholder={t("newpassword")} value={input.newpassword} onChange={changeInput}></input><br></br>
            <div className="birth">{t("birthday")}</div>
            <select aria-label="Day" name="birthday_day" id="day" title="Day"  className={changeClassForDate?"birthday1":"birthday"} onChange={changeDay} value={day}>
            <option value="0">Day</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option></select>
            <select aria-label="Month" name="month" id="month" className={changeClassForDate?"birthday1":"birthday"} onFocus={changeDateClass} onChange={changeMonth} value={month}>
            <option value={t("month")}>{t("month")}</option>
            <option value={t("jan")}>{t("jan")}</option>
            <option value={t("feb")}>{t("feb")}</option>
            <option value={t("march")}>{t("march")}</option>
            <option value={t("april")}>{t("april")}</option>
            <option value={t("may")}>{t("may")}</option>
            <option value={t("june")}>{t("june")}</option>
            <option value={t("july")}>{t("july")}</option>
            <option value={t("august")}>{t("august")}</option>
            <option value={t("sep")}>{t("sep")}</option>
            <option value={t("oct")}>{t("oct")}</option>
            <option value={t("nov")}>{t("nov")}</option>
            <option value={t("dec")}>{t("dec")}</option></select>
            <select aria-label="Year" name="year" id="year" title="Year" className={changeClassForDate?"birthday1":"birthday"} onFocus={changeDateClass} onChange={changeYear} value={year}>
                <option value="0">Year</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option>
            <option value="1905">1905</option></select>
            <br></br>
            <table className="gender">
                <tr className="gender1">{t("gender")}</tr>
                <tr>
                    <td className={inputClass.gender?"radiogender1":null}><input type="radio" name="gender" className="radiogender" value="female" checked={gender=="female"} onChange={changeGender}></input><span className="radiogender">{t("female")}</span></td>
                    <td className={inputClass.gender?"radiogender1":null}><input type="radio" name="gender" className="radiogender" value="male" checked={gender=="male"} onChange={changeGender} ></input><span className="radiogender">{t("male")}</span></td>
                    <td className={inputClass.gender?"radiogender1":null}><input type="radio" name="gender" className="radiogender" value="custom" checked={gender=="custom"} onChange={changeGender}></input><span className="radiogender">{t("custom")}</span></td>
                </tr>
            </table>
            {gender=="custom"?<><select aria-label="Select your pronoun" name="pronoun"  className={inputClass.pronoun?"pronoun1":"pronoun"} onChange={changePronoun} value={pronoun}><option value="Select your pronoun" >{t("Select your pronoun")}</option><option value="She: Wish her a happy birthday!">{t("She: Wish her a happy birthday!")}</option><option value="He: Wish him a happy birthday!">{t("He: Wish him a happy birthday!")}</option><option value="They: Wish them a happy birthday!">{t("They: Wish them a happy birthday!")}</option></select>
            <p className="belowPronoun">{t("Your pronoun is visible to everyone.")}</p>
            <input type="text" name="genderopt" className="genderopt" value={input.genderopt} onChange={changeInput} placeholder={t("Gender (optional)")}></input></>:null}
            <div className="policy">
            {t("By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.")}
            </div>
            <button className="signupButton"onClick={signUpPage}>{t("signuplink")}</button>
        </div>
        <div className={changeClass=="main__div"?"around__anchorList2":"around__anchorList3"} >
                <ul className="around__list">
                <li><a  className="anchor" onClick={()=>changeLanguage('en')}>English(UK)</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('hin')}>हिन्दी</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('ur')}>اردو</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('tam')}>தமிழ்</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('tel')}>తెలుగు</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('kan')}>ಕನ್ನಡ</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('or')}>ଓଡ଼ିଆ</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('mal')}>മലയാളം</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('pt')}>Português (Brasil)</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('span')}>Español</a></li>
                <li><a  className="anchor" onClick={()=>changeLanguage('fr')}>Français (France)</a></li>
                </ul>
                <hr className="horizontal"></hr>
                <ul  className="around__list">
                <li><a className="anchor">{t("signuplink")}</a></li>
                <li><a className="anchor">{t("login")}</a></li>
                <li><a className="anchor">{t("Messenger")}</a></li>
                <li><a className="anchor">{t("Facebook Lite")}</a></li>
                <li><a className="anchor">{t("Watch")}</a></li>
                <li><a className="anchor">{t("People")}</a></li>
                <li><a className="anchor">{t("Pages")}</a></li>
                <li><a className="anchor">{t("Page categories")}</a></li>
                <li><a className="anchor">{t("Places")}</a></li>
                <li><a className="anchor">{t("Games")}</a></li>
                <li><a className="anchor">{t("Locations")}</a></li>
                <li><a className="anchor">{t("Marketplace")}</a></li>
                <li><a className="anchor">{t("Facebook Pay")}</a></li>
                <li><a className="anchor">{t("Groups")}</a></li>
                <li><a className="anchor">{t("Jobs")}</a></li>
                <li><a className="anchor">{t("Oculus")}</a></li>
                <li><a className="anchor">{t("Portal")}</a></li>
                <li><a className="anchor">{t("Instagram")}</a></li>
                <li><a className="anchor">{t("Local")}</a></li>
                <li><a className="anchor">{t("Fundraisers")}</a></li>
                <li><a className="anchor">{t("Services")}</a></li>
                <li><a className="anchor">{t("Voting Information Centre")}</a></li>
                <li><a className="anchor">{t("About")}</a></li>
                <li><a className="anchor">{t("Create ad")}</a></li>
                <li><a className="anchor">{t("Create Page")}</a></li>
                <li><a className="anchor">{t("Developers")}</a></li>
                <li><a className="anchor">{t("Careers")}</a></li>
                <li><a className="anchor">{t("Privacy")}</a></li>
                <li><a className="anchor">{t("Cookies")}</a></li>
                <li><a className="anchor">{t("AdChoices")}</a></li>
                <li><a className="anchor">{t("Terms")}</a></li>
                <li><a className="anchor">{t("Help")}</a></li>
                </ul>
                <p className="copyright">Facebook &copy; 2021</p>
            </div>
        </>
    )

}

export default SignUp;