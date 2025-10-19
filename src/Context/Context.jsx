import { createContext, useState } from "react";
import { run } from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResults] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function(){
      setResultData(prev=>prev+nextWord);
    },75*index)

  }
  const newChat =() => {
    setLoading(false)
    setShowResults(false)
  }
    const onSent = async (prompt) => {
      // if (!prompt) return;
      setResultData("")
      setLoading(true);
      setShowResults(true);
      let response;
      if(prompt !== undefined){
        setPrevPrompts(prev => [...prev, prompt]);
       
          setRecentPrompt(prompt)
          response=await run (prompt);
      }
      else{
        setPrevPrompts(prev=>[...prev,input])
        setRecentPrompt(input)
        response =await run(input)

      }
     
     
      let resopnseArray = response.split("**");
      let newResponse= "";
      for (let i = 0; i < resopnseArray.length; i++) {
        if (i == 0 || i % 2 !== 1) {
          newResponse += resopnseArray[i];
        }
        else {
          newResponse += "<b>" + resopnseArray[i] + "</b>";
        }
      }
      let newResponse2= newResponse.split("*").join("</br>")
     let newResponseArray= newResponse2.split(" ");
     for(let i=0; i<newResponseArray.length;i++)
     {
      const nextWord =newResponseArray[i];
      delayPara(i,nextWord+" ")
     }
      setLoading(false);
      setInput("");



      // try {
      //   const response = await run(prompt);
      //   console.log("Response from Gemini:", response);
      //   setResultData(response);
      // } catch (err) {
      //   setResultData("Something went wrong.");
      // } finally {
      //   setLoading(false); // stop loading after response
      //   setInput("");
      // }
    }


    const contextValue = {
      prevPrompts,
      setPrevPrompts,
      input,
      setInput,
      onSent,
      recentPrompt,
      setRecentPrompt,
      showResult,
      setShowResults,
      loading,
      resultData,
      newChat,
    }

    return (
      <Context.Provider value={contextValue}>
        {props.children}
      </Context.Provider>
    )
  }

  export default ContextProvider;
