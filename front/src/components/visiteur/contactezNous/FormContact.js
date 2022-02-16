import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// import { useSelector } from "react-redux";
import { postMessages } from "store/actions/MessagesActions";
import { store } from 'store';

export default function FormContact() {

    // const Message = useSelector((state) => state.messages.listMessage)

    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [tel, setTel] = useState();
    const [mail, setMail] = useState();
    const [sujet, setSujet] = useState();
    const [message, setMessage] = useState();

    const InputList = [
        { label: "Nom", multiline: false, rows: '1' },
        { label: "Prenom", multiline: false, rows: '1' },
        { label: "Tel", multiline: false, rows: '1' },
        { label: "Mail", multiline: false, rows: '1' },
        { label: "Sujet", multiline: false, rows: '1' },
        { label: "Message", multiline: true, rows: '10' },
    ]

    const handleForm = (e) => {
        switch (e.target.name) {
            case 'Nom':
                setNom(e.target.value)
                break;
            case 'Prenom':
                setPrenom(e.target.value)
                break;
            case 'Tel':
                setTel(e.target.value)
                break;
            case 'Mail':
                setMail(e.target.value)
                break;
            case 'Sujet':
                setSujet(e.target.value)
                break;
            case 'Message':
                setMessage(e.target.value)
                break;
            default:
            // code block
        }
    }

    const submitForm = () => {
        console.log('submitForm', nom, prenom, tel, mail, sujet, message)
        if (nom & prenom & tel & mail & sujet & message) {
            store.dispatch(postMessages({
                nom,
                prenom,
                tel,
                mail,
                message,
                sujet
            }))
            setNom('')
            setPrenom('')
            setTel('')
            setMail('')
            setSujet('')
            setMessage('')
        }
    }

    return (
        <Box sx={{ px: 5 }}>
            <Typography
                align='center'
                variant="h3"
                sx={{
                    borderBottom: 2,
                    mx: 'auto',
                    my: 3,
                    pb: 5,
                    width: '50%',
                }}
            >
                Contactez-nous
            </Typography>
            <Box sx={{
                maxWidth: 620,
                mx: 'auto'
            }}
            >
                {InputList.map((input, index) => (
                    <TextField
                        key={index}
                        label={input.label}
                        name={input.label}
                        multiline={input.multiline}
                        rows={input.rows}
                        color='secondary'
                        variant="outlined"
                        fullWidth
                        onChange={(e) => handleForm(e)}
                        sx={{
                            display: "block",
                            my: 2,
                        }}
                    />
                ))}
                <Button
                    variant="contained"
                    color='secondary'
                    fullWidth
                    size='large'
                    onClick={() => submitForm()}
                    sx={{
                        display: "block",
                        width: '100%',
                        mt: 2,
                        mb: 10,
                        fontSize: '20px',
                        py: { xs: 1, md: 2 }
                    }}
                >
                    Envoyer
                </Button>
            </Box>
        </Box>
    );
};