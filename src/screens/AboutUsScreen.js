import React from 'react'

function AboutUsScreen() {
    const classes = {
        container : {
            // border : "1px solid red",
            padding : "3% 7% 0"
        },
        row : {
            margin : "20px"
        },
        link : {
            margin : "0 10px"
        },
        title : {
            width : "125px",
            // border : '1px solid black',
            display : 'inline-block'
        }
    }
    return (
        <div style={{padding : "4rem 0 0"}}>
            <div style={classes.container}>
                <h2>Developers :</h2>
                <div style={classes.row}>
                    <span style={classes.title}>Varinder Singh</span>
                    <span>:</span>
                    <a style={classes.link} href='https://www.linkedin.com/in/varinder-s-9a943916a/' target='_blank' rel="noreferrer">Connect on LinkedIn</a>
                    <span>or</span>
                    <a style={classes.link} href="mailto:varindersingh6885@gmail.com">Send an Email</a>
                </div>
                <div style={classes.row}>
                    <span style={classes.title}>Rupinder Singh</span>
                    <span>:</span>
                    <a style={classes.link} href='https://www.linkedin.com/in/rupinder-singh-9b29ba1b6/' target='_blank' rel="noreferrer">Connect on LinkedIn</a>
                    <span>or</span>
                    <a style={classes.link} href="mailto:rupindersinghsaini1999@gmail.com">Send an Email</a>
                </div>
            </div>
        </div>
    )
}

export default AboutUsScreen
