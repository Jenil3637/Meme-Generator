import React from "react"


export default function Meme() {

    
    
    // const [memeImage , setMemeImageTo] = React.useState("https://i.imgflip.com/8p0a.jpg")
    
    const [meme , setMeme] = React.useState({
        topText: "", 
        bottomText: "",   
        randomImage: "https://i.imgflip.com/8p0a.jpg"
    })

    const [allMemes, setAllMeme] = React.useState([])

    React.useEffect(function () {
        console.log("It shows")
        fetch (`https://api.imgflip.com/get_memes`)
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes))
    },[])


    function handleChange(event) {
        const {name , value} = event.target
        
        setMeme ( (prevMeme)=> ({
            ...prevMeme,
            [name] : value
        } ))
    }

    function getMemeImage () {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        console.log(meme)
        setMeme(prevName => ({
            ...prevName,
            randomImage: url
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form-input"
                    onChange={handleChange}
                    name="topText"
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form-input"
                    onChange={handleChange}
                    name="bottomText"
                />
                <button 
                    onClick={getMemeImage}
                    className="form-button"
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme-image" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
            {/* <img src={meme.randomImage} className="meme-image" /> */}
        </main>
    )
}