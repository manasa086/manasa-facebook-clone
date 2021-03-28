import React,{useState} from 'react';
import "./Login.css"
import {useTranslation} from "react-i18next";
import i18n from  "./i18n";
import {useHistory} from "react-router-dom";

function Login() {
    const [changeClass,setChangeClass]=useState("main__div");
    const {t,i18n}=useTranslation();
    const history=useHistory();
    const [input,setInput]=useState({password:"",mobemail:""});
    const [inputClass,setInputClass]=useState({mobemail:false,password:false});

    const changeLanguage=(ln)=>{
        i18n.changeLanguage(ln)
        if(ln=='ur'){
            setChangeClass("main__div1")
        }
        else{
            setChangeClass("main__div");
        }
    }
    const changeInput=(e)=>{
        // console.log(e.target.value)
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const navigateSignUp=()=>{
        history.push("/signUp")
    }
    const login=(e)=>{
        e.preventDefault();
        let store=true;
        for(let key in inputClass){
            if(inputClass[key]){
                console.log("inputClassStore",key)
                store=false;
                break;
            }
        }
        let data={}
        for(let key in input){
            if(!(input[key])){
                console.log("He", key)
                store=false;
                data[key]=true;
            }
            
        }
        setInputClass(data)
        console.log(store,data);
        if(store){
            let validemailmob=true;
            let email=false;
            let mobile=false;
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
            if(validemailmob){
                fetch("https://manasa-facebook-clone.herokuapp.com/login",{
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
            else{
                setInputClass({
                    "mobemail":true,
                    "password":true
                })
            }
        }
    

    }

    const forgotAccount=(e)=>{
        e.preventDefault();
        history.push("/forgotpass");
    }
    const navigateForgotPass=()=>{
        history.push("/forgotpass");
    }

    return (
        <>
        <div className={changeClass=="main__div"?"main__div":"main__div1"} >
        <div className="image__div" >
        <img  className="image" src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"></img>
        </div>
       
        <p></p>
        <div className="around_form">
        <div className="outside__form">
            <span className="around__form_header">
                <div className="form_header">{t("header")}</div>
            </span>
            <p></p>
            <p></p>
            <form>
                <input type="text" name="mobemail" id="emailphone" className={inputClass.mobemail?"input__Email1":"input__Email"} onChange={changeInput} value={input.mobemail} placeholder={t("email")}></input>
                <p></p>
                <input type="password" name="password" id="password" className={inputClass.password?"input__Email1":"input__Email"} value={input.password} onChange={changeInput} placeholder={t("pass")}></input>
                <p></p>
                <button className="form__button" onClick={login}>{t("login")}</button>
                {inputClass.mobemail || inputClass.password?<a href="#" onClick={navigateForgotPass} className="forgot1">{t("forgot")}</a>:
                <p><a href="#" className="forgot"onClick={forgotAccount}>{t("forgottenaccount")}</a>&nbsp;
                <a href="#" onClick={navigateSignUp} className="forgot1">{t("signup")}</a></p>}
                
            </form>
        </div>
        </div>
        </div>
            <div className={changeClass=="main__div"?"around__anchorList":"around__anchorList1"} >
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

export default Login;
