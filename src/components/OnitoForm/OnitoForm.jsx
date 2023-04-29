import React from 'react'
import { useForm } from 'react-hook-form'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Box,
    Heading,
    Input,
    Select,
    Button,
    NumberInput,
    NumberInputField,
    useToast,
} from '@chakra-ui/react'
import { formValidation } from '../../validation/formValidation';
// import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const postFormData = async (data) => {
    try {
        let res = await axios.post("https://mocknine.onrender.com/users", data);
        return res
    } catch (error) {
        console.log(error);
    }
}

const OnitoForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const toast = useToast();

    const navigate = useNavigate()

    const formDataSubmit = async (data) => {
        console.log(data);
        const isValid = await formValidation.isValid({
            name: data.name,
            age: data.age,
            sex: data.sex,
            mobile: data.mobile,
            ecMobile: data.ecMobile,
            goiNum: data.goiNum,
        });
        console.log(isValid);
        if (isValid) {
            postFormData(data).then(res => {
                if (res.status === 201) {
                    toast({
                        title: 'User Data added Successfully',
                        description: "Please navigate to table page to see the table",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    })
                    setTimeout(() => {
                        navigate("/table")
                    }, 2000);
                }
            });
        } else {
            toast({
                title: 'Something went wrong!',
                description: "Please check every input fields filled correctly",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(formDataSubmit)} style={{ border: "1px solid red", width: "100%" }}>
                <Heading border={"1px"} size={"lg"} textAlign={"center"}>Onito Form</Heading>
                <Box p={3}>
                    <Heading size={"md"} textDecoration={"underline"}> <li>Perosonal Details</li> </Heading>
                    <Box p={3} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='Enter your name' type='text' {...register("name", { required: true })} />
                            {errors.name && (
                                <FormErrorMessage>Name is required.</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.age}>
                            <FormLabel>Date of Birth or Age</FormLabel>
                            <Input placeholder='DD/MM/YYYY or AGE' type='text' {...register("age", { required: true })} />
                            {errors.age && (
                                <FormErrorMessage>Date of Birth or is required.</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.sex}>
                            <FormLabel>Sex</FormLabel>
                            <Select {...register("sex", { required: true })} placeholder='Enter Your Sex'>
                                <option value="male">Male</option>
                                <option value="femal">Female</option>
                                <option value="trans">Transgender</option>
                            </Select>
                            {errors.sex && (
                                <FormErrorMessage>Sex is required.</FormErrorMessage>
                            )}
                        </FormControl>
                    </Box>
                    <Box p={3} display={"flex"} gap={3}>
                        <FormControl flex={1} isInvalid={errors.mobile}>
                            <FormLabel>Mobile</FormLabel>
                            <NumberInput>
                                <NumberInputField placeholder='Enter your mobile number' maxLength={10} minLength={10} {...register("mobile")} />
                            </NumberInput>
                            {errors.mobile && (
                                <FormErrorMessage>Please enter a valid 10 digit indian mobile number</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl flex={2} >
                            <FormLabel>Govt Issued ID</FormLabel>
                            <Box display={"flex"} gap={3}>
                                <Select placeholder='ID Type' {...register("goi")}>
                                    <option value="aadhar">Aadhar Card</option>
                                    <option value="pan">PAN Card</option>
                                </Select>
                                <Input {...register("goiNum")} textTransform={"uppercase"} maxLength={12} minLength={10} type='text' placeholder='Enter Your ID ' />
                            </Box>
                        </FormControl>
                    </Box>
                </Box>
                <Box p={3}>
                    <Heading size={"md"} textDecoration={"underline"}> <li>Contact Details</li> </Heading>
                    <Box p={3} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                        <FormControl>
                            <FormLabel>Guardian Name</FormLabel>
                            <Input placeholder='Enter your Guardian Name' type='text' {...register("guardianName")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Enter your email' type='email' {...register("email")} />
                        </FormControl>
                        <FormControl isInvalid={errors.ecMobile}>
                            <FormLabel>Emergency Contact Number</FormLabel>
                            <NumberInput>
                                <NumberInputField placeholder='Emergency Contact Number' minLength={10} maxLength={10} {...register("ecMobile")} />
                            </NumberInput>
                            {errors.ecMobile && (
                                <FormErrorMessage>Please enter a valid 10 digit indian mobile number</FormErrorMessage>
                            )}
                        </FormControl>
                    </Box>
                </Box>
                <Box p={3}>
                    <Heading size={"md"} textDecoration={"underline"}> <li>Address Details</li> </Heading>
                    <br />
                    <Box p={3} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input placeholder='Enter your Address' type='text' {...register("address")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>State</FormLabel>
                            <Input placeholder='Enter your state' type='text' {...register("state")} />
                        </FormControl>
                        <FormControl isInvalid={errors.ecMobile}>
                            <FormLabel>City</FormLabel>
                            <Input placeholder='Enter your City' type='text' {...register("city")} />
                        </FormControl>
                    </Box>
                    <Box p={3} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                        <FormControl flex={1}>
                            <FormLabel>Country</FormLabel>
                            <Select {...register("country")} >
                                <option value="india">India</option>
                            </Select>
                        </FormControl>
                        <FormControl flex={2}>
                            <FormLabel>Pin Code</FormLabel>
                            <Input width={"49%"} placeholder='Enter your Pin Code' type='number' {...register("pinCode")} />
                        </FormControl>
                    </Box>
                </Box>
                <Box p={3}>
                    <Heading size={"md"} textDecoration={"underline"}> <li>Other Details</li> </Heading>
                    <Box p={3} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                        <FormControl>
                            <FormLabel>Occupation</FormLabel>
                            <Input placeholder='Enter your Occupation' type='text' {...register("occupation")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Religion</FormLabel>
                            <Select placeholder='Select Religion' {...register("religion")} textTransform={"capitalize"}>
                                <option value="hindu">hindu</option>
                                <option value="muslim">muslim</option>
                                <option value="sikh">sikh</option>
                                <option value="christian">christian</option>
                                <option value="other">other</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Marital Status</FormLabel>
                            <Select placeholder='Marital Status' {...register("maritalStatus")} textTransform={"capitalize"}>
                                <option value="married">married</option>
                                <option value="unmarried">unmarried</option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box p={3} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                        <FormControl flex={1}>
                            <FormLabel>Blood Group</FormLabel>
                            <Select placeholder='Select your Blood Group' {...register("bloodGroup")} >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </Select>
                        </FormControl>
                        <FormControl flex={2}>
                            <FormLabel>Nationality</FormLabel>
                            <Select width={"49%"} placeholder=' Select your Nationality' {...register("nationality")}>
                                <option value="india">India</option>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"} gap={3}>
                    <Button type='submit' colorScheme={"red"}>Cancel</Button>
                    <Button type='submit' colorScheme={"whatsapp"}>Submit</Button>
                </Box>
                <br />
            </form>
        </Box>
    )
}

export default OnitoForm