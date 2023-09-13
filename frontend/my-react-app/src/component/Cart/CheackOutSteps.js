import react, { Fragment } from "react"
import { Step, StepLabel, Stepper, Typography } from "@material-ui/core"
import LocalShippingIcon from "@material-ui/icons/LocalShipping"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck"
const CheackOutSteps = ({ activeStep }) => {
    const Steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />

        },
        {
            label: <Typography>Coonfirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        },
    ]
    const stepStyles = {
        boxSizing: "border-box",
    }
    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {Steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel icon={item.icon} 
                        style={{
                            color:activeStep >= index ? "tomato":"rgba(0,0,0,0.649)"
                        }}
                        >{item.label} </StepLabel>
                    </Step>
                ))}

            </Stepper>
        </Fragment>
    )
}
export default CheackOutSteps