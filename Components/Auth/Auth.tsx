"use client"
import React, { FormEventHandler, useState } from 'react'

import styles from './Auth.module.css'

import Link from 'next/link'
import { useRouter } from 'next/navigation'


// For Components
import Wrapper from '@/Components/Wrapper/Wrapper'
import { InputBox } from '@/Components/InputBox/InputBox'

// For Uploadthing
import { UploadDropzone } from "@/utils/uploadthing";
import Image from 'next/image'
import { signIn } from 'next-auth/react'





export const Auth = () => {

    const router = useRouter()


    // For Input Fields
    const [Name, SetName] = useState("")
    const [Email, SetEmail] = useState("")
    const [Password, SetPassword] = useState("")

    // For Others
    const [Varient, SetVarient] = useState("Login")
    const [UploadImage, SetUploadImage] = useState("")

    // For Error/Success Message
    const [ErrorMessage, SetErrorMessage] = useState("")
    const [SuccessMessage, SetSuccessMessage] = useState("")








    // To Switch Varient
    const SwitchVarient = () => {
        SetVarient(Varient === "Login" ? "Register" : "Login")
    }

    // For Handling Login Submit
    const HandleLoginSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        // console.log("Login Form Submitted")


        // Small Validation
        if (!Name || !Email || !Password) {
            SetSuccessMessage("")
            SetErrorMessage("You Forgot To Fill The Fields😠")
        }


        try {

            SetErrorMessage("")
            SetSuccessMessage("")
            const res = await signIn("credentials", {
                Email, Password, redirect: false,
            })

            if (res?.error) {
                SetErrorMessage("Invalid Credentials😭")
            } else {
                SetSuccessMessage("Logging..... 😊")
                router.replace("/Dashboard")
            }

            // if All Set




        } catch (error) {
            SetErrorMessage("OPPS! Error on Our Side 😠")
        }



    }



    // For Handling Register Submit
    const HandleRegisterSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        // console.log("")

        // Small Validation
        if (!Name || !Email || !Password || !UploadImage) {
            SetSuccessMessage("")
            SetErrorMessage("You Forgot To Fill The Fields😠")
        }


        try {
            // API REQ TO CHECK WHETHER THE EMAIL IS PRESENT OR NOT
            const resUserExists = await fetch(`${window.location.origin}/api/UserExists`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ Email }),
            });
            const { user } = await resUserExists.json()
            if (user) {
                SetSuccessMessage("")
                // SetErrorMessage("") 
                SetErrorMessage("Email ID Already Used😠")
                return
            }



            // API REQ TO REGISTER USER
            const res = await fetch(`${window.location.origin}/api/Register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Name, Email, Password, UploadImage
                })
            })

            if (res.ok) {
                SetErrorMessage("")
                SetSuccessMessage("Registration Successfull! Login Now😊")
                SetPassword("")
                SwitchVarient()
            } else {
                SetSuccessMessage("")
                SetErrorMessage("OOPS! Something Went Wrong Try Again😠")
            }


        } catch (error) {
            console.log(error)
            SetErrorMessage("OOPS! Error On Our Side😠")
        }
















    }


    return (
        <Wrapper>

            <div className={styles.Auth}>
                <form onSubmit={Varient === "Login" ? HandleLoginSubmit : HandleRegisterSubmit}>
                    <h6>
                        {Varient === 'Login' ? "Login Now 🔐" : "Register Now 🙏"}
                    </h6>

                    {/* For Name */}
                    {
                        Varient === 'Register' && (
                            <InputBox
                                labelText='Your Name'
                                InputType='text'
                                id='Name'
                                value={Name}
                                onChange={(e: any) => SetName(e.target.value)}
                            // Required={true}
                            />

                        )
                    }
                    {/* For Email */}
                    <InputBox
                        labelText='Your Email'
                        InputType='email'
                        id='email'
                        value={Email}
                        onChange={(e: any) => SetEmail(e.target.value)}
                    // Required={true}
                    />
                    {/* For Password */}
                    <InputBox
                        // Required={true}
                        labelText='Your Password'
                        InputType='password'
                        id='password'
                        value={Password}
                        onChange={(e: any) => SetPassword(e.target.value)}
                    />

                    {
                        Varient === "Register" && (
                            <>
                                {/* For Upload Image */}
                                <div className={styles.Upload_Dropzone_Image}>
                                    <label htmlFor="UploadDropZoneImg">Upload Profile Photo</label>
                                    <div className={styles.Upload_Dropzone_Image_Parent}>
                                        <div>
                                            <UploadDropzone
                                                // For appearance
                                                appearance={
                                                    {
                                                        container: {
                                                            width: "250px",
                                                            height: "250px"
                                                        },
                                                        uploadIcon: {
                                                            color: "#ff0000"
                                                        },
                                                        button: {
                                                            background: "#ff0000"
                                                        },
                                                        label: {
                                                            color: "#ff0000"
                                                        }
                                                    }
                                                }
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    // Do something with the response
                                                    // console.log("Files: ", res);
                                                    // alert("Upload Completed");
                                                    SetUploadImage(res[0].url)
                                                }}
                                                onUploadError={(error: Error) => {
                                                    // Do something with the error.
                                                    // alert(`ERROR! ${error.message}`);
                                                    SetErrorMessage("Something Went Wrong! Upload Img Again🙏")
                                                }}
                                            />
                                        </div>
                                        <div>
                                            {
                                                UploadImage && (
                                                    <Link href={UploadImage} target='_blank'>
                                                        <Image
                                                            src={UploadImage}
                                                            height={250}
                                                            width={250}
                                                            alt=''
                                                        />
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }


                    <button className={styles.Btn}>
                        {
                            Varient === "Login" ? " Login Now" : "Register  Now"
                        }
                    </button>

                    <p className={styles.CustomMessage}>
                        {
                            Varient === 'Login' ? "Don't have An Account😲 " : "Already have An Account😎 "
                        }
                        <span onClick={SwitchVarient}>
                            {Varient === 'Login' ? "Register Now😎" : "Login Now😎"}
                        </span>
                    </p>


                    {/* For Error/Success Message */}
                    {
                        ErrorMessage && (
                            <p className={styles.ErrorMessage}>
                                {ErrorMessage}
                            </p>
                        )
                    }

                    {/* For Success Message */}
                    {
                        SuccessMessage && (
                            <p className={styles.SuccessMessage}>{SuccessMessage}</p>
                        )
                    }


                </form>
            </div>

        </Wrapper>
    )
}
