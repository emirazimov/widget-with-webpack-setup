import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import React from "react"
import Carousel from "react-material-ui-carousel"
import { connect } from "react-redux"
import { BackArrowIcon, ForwardArrowIcon } from "../../../assets/icons"
import { Preloader } from "./../../Helpers/Preloader"
import { setCarId } from "../../../Redux/form-reducer"
import { AppBar, useMediaQuery } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import { AspectRatio } from "react-aspect-ratio"
import "./FleetForm.css"
import { setGateMeetingRedux } from "../../../Redux/gate-meeting-reducer"
import Error from "../../Helpers/Error"
import { setResetWidgetInputs } from "../../../Redux/reset-widget-inputs-reducer"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    paddingTop: "15px",
    paddingLeft: "0px",
    paddingBottom: "6px",
    cursor: "pointer",
    border: "1px solid black",
    boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.1)",
    // "&:hover": {
    //   backgroundColor: "red",
    // },
    // "&$selected": { backgroundColor: "white" },
  },
  contentContainer: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(1),
    height: "100%",
    flexwrap: "nowrap",
    backgroundColor: "white",
  },
  carContainer: {
    overflowY: "scroll",
    overflowX: "hidden",

    "&::-webkit-scrollbar": {
      width: "0.7em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#3F3D4A",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
  priceBox: {
    backgroundColor: "#851EDF",
    padding: theme.spacing(1),
  },
  buttonGroup: {
    // bottom: 15,
    // position: "absolute",
    // position: "absolute",
    // right: "0",
    // top: "auto",
    // bottom: "auto",
    padding: "10px 17px 14px 16px",
    backgroundColor: "white",
  },
  carInfoCont: {
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      padding: theme.spacing(0),
    },
    margin: "0px",
    marginTop: "-10px",
    width: "143px",
  },
  carInfoContForMobile: {
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      padding: theme.spacing(0),
    },
    margin: "0px",
    marginTop: "-10px",
    width: "100%",
  },
  listRoot: {
    opacity: "0.5",
    background: "#bfbfbf",
    "&:hover": {
      backgroundColor: "white",
      opacity: "1",
    },
  },

  active: {
    "&.Mui-selected": {
      // backgroundColor: "#C6AD99",
      opacity: "1",
    },
    "&.Mui-selected:hover": {
      opacity: "1",
      // backgroundColor: "#C6AD99",
    },
  },
  backButtonSelf: {
    backgroundColor: "#282828",
    border: "1px solid transparent",
    color: "white",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  nextButtonSelf: {
    backgroundColor: "#282828",
    border: "1px solid transparent",
    color: "white",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    "&.MuiButton-contained.Mui-disabled": {
      backgroundColor: "grey",
    },
  },
}))

const FleetForm = React.memo(
  ({
    cars,
    isFetching,
    back,
    next,
    setCarId,
    gateMeeting,
    setGateMeetingRedux,
    hourlyAndSeatsRedux,
    error,
    setActiveStep,
    setResetWidgetInputs,
  }) => {
    const classes = useStyles()
    const [carCard, setCarCard] = React.useState(0)
    const [carModal, setCarModal] = React.useState(null)
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = (id) => {
      setCarModal(id)
      setOpen(true)
    }

    const handleClose = () => {
      setCarModal(null)
      setOpen(false)
    }

    const handleClick = (id) => {
      setCarCard(id)
    }

    let result = null
    if (carModal) {
      result = cars.find((cars) => carModal === cars.id)
    }

    React.useEffect(() => {
      setCarCard(carCard)
    }, [carCard])
    const cars2 = { ...cars }
    const round = (n, dp) => {
      const h = +"1".padEnd(dp + 1, "0") // 10 or 100 or 1000 or etc
      return Math.round(n * h) / h
    }
    const isMobile = useMediaQuery("(max-width:500px)")
    const isiPad = useMediaQuery("(max-width:1024px)")

    const ifThereisError = () => {
      if (error) {
        return <Error errorMessage={error} setActiveStep={setActiveStep} />
      } else {
        if (!isFetching) {
          return (
            <Grid
              container
              justify="center"
              style={
                {
                  // height: isiPad ? "100%" : "89%",
                  // paddingTop: isMobile ? "0px" : "0px",
                }
              }
            >
              <Grid
                container
                direction="column"
                spacing={1}
                className={classes.contentContainer}
              >
                <Grid item>
                  {/* <AppBar
              position="sticky"
              color=" #101020"
              style={{ top: '100px', bottom: '0' }}
            > */}
                  <Typography
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: 500,
                      color: "black",
                      fontSize: "22px",
                      lineHeight: "36px",
                    }}
                  >
                    Select vehicle
                  </Typography>
                  {/* </AppBar> */}
                </Grid>
                <Grid
                  item
                  className={classes.carContainer}
                  style={{ paddingBottom: "10px" }}
                >
                  <Grid container direction="column" spacing={2} flexGrow={1}>
                    {console.log(typeof cars)}
                    {cars.map((car, index) => (
                      <Grid item key={`${car.id}${car.name}`}>
                        <ListItem
                          className={classes.root}
                          onClick={() => {
                            handleClick(car.id)
                          }}
                          selected={car.id === carCard}
                          classes={{
                            root: classes.listRoot,
                            selected: car.id && classes.active,
                          }}
                          // style={{
                          //   opacity: "0.5",
                          //   "&:hover": { opacity: "1" },
                          // }}
                        >
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                          >
                            <Grid
                              item
                              style={{
                                marginLeft: "11px",
                                marginBottom: "-2px",
                                width: "48.70%",
                              }}
                            >
                              <Carousel
                                autoPlay={false}
                                animation="slide"
                                navButtonsProps={{
                                  style: {
                                    width: "1em",
                                    height: "1em",
                                  },
                                }}
                                indicatorIconButtonProps={{
                                  style: {
                                    "&:hover": {
                                      "&$button": {
                                        backgroundColor: "#10B7EC",
                                        filter: "brightness(120%)",
                                        opacity: "0.4",
                                      },
                                    },
                                    marginTop: "-80px",

                                    // marginBottom: "-30px",
                                    color: "grey",
                                  },
                                }}
                                activeIndicatorIconButtonProps={{
                                  style: {
                                    color: "white",
                                    height: "10px",
                                  },
                                }}
                                indicatorContainerProps={{
                                  style: { height: "0px" },
                                }}
                              >
                                {car.imageUrls.length !== 0 ? (
                                  car.imageUrls.map((url) => (
                                    <span
                                      key={url.id}
                                      variant="outlined"
                                      color="primary"
                                      onClick={() => handleClickOpen(car.id)}
                                    >
                                      <div
                                        style={{
                                          position: "absolute",
                                          width: "75px",
                                          height: "20px",
                                          backgroundColor: "#282828",
                                          color: "white",
                                          fontSize: "13px",
                                          paddingLeft: "12px",
                                          borderTopLeftRadius: "3px",
                                        }}
                                      >
                                        or similar
                                      </div>
                                      <AspectRatio
                                        // ratio="560/315"
                                        style={{
                                          display: "block",
                                          width: !isMobile ? "100%" : "100%",
                                          height: !isMobile ? "112px" : "116px",

                                          cursor: "zoom-in",
                                        }}
                                      >
                                        <img
                                          src={url.path}
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            // display: "block",
                                            // width: !isMobile ? "170px" : "100%",
                                            // height: !isMobile ? "127px" : "116px",
                                            borderRadius: "5px",
                                            // cursor: "zoom-in",
                                          }}
                                          alt="car"
                                        />
                                      </AspectRatio>
                                    </span>
                                  ))
                                ) : (
                                  <>
                                    <span
                                      style={{
                                        position: "absolute",
                                        width: "75px",
                                        height: "20px",
                                        backgroundColor: "#282828",
                                        color: "white",
                                        fontSize: "13px",
                                        paddingLeft: "12px",
                                        borderTopLeftRadius: "3px",
                                      }}
                                    >
                                      or similar
                                    </span>
                                    <img
                                      src={
                                        "https://fl-1.cdn.flockler.com/embed/not-found.png"
                                      }
                                      style={{
                                        width: !isMobile ? "100%" : "100%",
                                        height: !isMobile ? "112px" : "116px",
                                        borderRadius: "5px",
                                      }}
                                      alt="car"
                                    />
                                  </>
                                )}
                              </Carousel>

                              {carModal && (
                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogActions>
                                    <Carousel
                                      autoPlay={false}
                                      animation="slide"
                                      swipe={true}
                                      navButtonsAlwaysVisible={true}
                                      navButtonsProps={{
                                        style: {
                                          width: "1em",
                                          height: "1em",
                                        },
                                      }}
                                      indicatorIconButtonProps={{
                                        style: {
                                          "&:hover": {
                                            "& $button": {
                                              backgroundColor: "#10B7EC",
                                              filter: "brightness(120%)",
                                              opacity: "0.4",
                                            },
                                          },
                                        },
                                      }}
                                      activeIndicatorIconButtonProps={{
                                        style: {
                                          color: "#10B7EC",
                                        },
                                      }}
                                      indicatorContainerProps={{
                                        style: {},
                                      }}
                                    >
                                      {carModal &&
                                        result.imageUrls.map((url) => (
                                          <AspectRatio
                                            ratio="4/3"
                                            style={{
                                              width: !isMobile
                                                ? "550px"
                                                : "239px",
                                              height: !isMobile
                                                ? "400px"
                                                : "170px",
                                              display: "flex",
                                              flexDirection: "row",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              // display: "block",
                                              // width: !isMobile ? "170px" : "100%",
                                              // height: !isMobile ? "107px" : "116px",
                                              // // borderRadius: "8px",
                                              // cursor: "zoom-in",
                                              // width: "100%",
                                              // height: "100%",
                                              // userDrag: "none",
                                              // userSelect: "none",
                                              // mozUserSelect: "none",
                                              // webkitUserDrag: "none",
                                              // webkitUserSelect: "none",
                                              // msUserSelect: "none",
                                              // maxWidth: "500px",
                                            }}
                                          >
                                            <img
                                              src={url.path}
                                              style={{
                                                borderRadius: "8px",
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                              }}
                                              alt="car"
                                              key={`${url.id}${url.path}`}
                                            />
                                          </AspectRatio>
                                        ))}
                                    </Carousel>
                                  </DialogActions>
                                </Dialog>
                              )}
                            </Grid>
                            <Grid
                              item
                              style={{ width: !isMobile ? "44.5%" : "43.70%" }}
                            >
                              <Grid
                                container
                                direction="row"
                                spacing={2}
                                className={
                                  !isMobile
                                    ? classes.carInfoCont
                                    : classes.carInfoContForMobile
                                }
                              >
                                <Typography
                                  variant="body2"
                                  style={{ fontSize: "15.5px", color: "black" }}
                                >
                                  {car.make} {car.model}
                                </Typography>

                                {/* <Typography
                            variant='body2'
                            style={{ fontSize: '18px' }}
                          ></Typography> */}

                                <Grid
                                  container
                                  justify="row"
                                  justify="space-between"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <Typography
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      Type
                                    </Typography>
                                  </Grid>
                                  <Grid item style={{ flexGrow: 1 }}>
                                    <Box
                                      style={{
                                        marginTop: "12px",
                                        backgroundColor: "transparent",
                                        marginLeft: "3px",
                                        marginRight: "3px",
                                        borderBottom: "2px dotted black",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {car.type}
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid
                                  container
                                  justify="row"
                                  justify="space-between"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <Typography
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      Capacity
                                    </Typography>
                                  </Grid>
                                  <Grid item style={{ flexGrow: 1 }}>
                                    <Box
                                      style={{
                                        marginTop: "12px",
                                        backgroundColor: "transparent",
                                        marginLeft: "3px",
                                        marginRight: "3px",
                                        borderBottom: "2px dotted black",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {car.capacity}
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid container justify="row">
                                  <Grid item>
                                    <Typography
                                      style={{
                                        color: "black",
                                        fontSize: "12px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      Color
                                    </Typography>
                                  </Grid>
                                  <Grid item style={{ flexGrow: 1 }}>
                                    <Box
                                      style={{
                                        marginTop: "12px",
                                        backgroundColor: "transparent",
                                        marginLeft: "3px",
                                        marginRight: "3px",
                                        borderBottom: "2px dotted black",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      style={{
                                        color: "black",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {car.color}
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid
                                  container
                                  justify="row"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <Typography
                                      style={{
                                        color: "black",
                                        fontSize: "12px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      Amount
                                    </Typography>
                                  </Grid>
                                  <Grid item style={{ flexGrow: 1 }}>
                                    <Box
                                      style={{
                                        marginTop: "8px",
                                        backgroundColor: "transparent",
                                        marginLeft: "3px",
                                        marginRight: "3px",
                                        borderBottom: "2px dotted black",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      style={{
                                        color: "black",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      {gateMeeting
                                        ? `$${round(car.price, 2)}`
                                        : `$${round(car.price, 2)}`}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                {/* <Grid item xs={8}>
                            <Paper className={classes.priceBox}>
                              <Grid container justify="center">
                                <Typography variant="body2">
                                  ${car.price}
                                </Typography>
                              </Grid>
                            </Paper>
                          </Grid> */}
                              </Grid>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </Grid>
                    ))}
                    {Object.keys(cars).length === 0 && (
                      <div
                        style={{
                          color: "grey",
                          fontSize: "26px",
                          marginLeft: "7px",
                        }}
                      >
                        No cars
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <AppBar
                position="sticky"
                color="primary"
                className={classes.appBar}
                style={{
                  top: "auto",
                  bottom: "3px",
                }}
              >
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing={1}
                  className={classes.buttonGroup}
                  // style={{
                  //   paddingBottom: "14px",
                  //   paddingLeft: "16px",
                  //   paddingRight: "0px",
                  // }}
                >
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        back()
                        setGateMeetingRedux(false)
                        setResetWidgetInputs(false)
                      }}
                      startIcon={<BackArrowIcon />}
                      className={classes.backButtonSelf}
                      style={{
                        height: "50px",

                        textTransform: "none",
                      }}
                    >
                      Back
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        next()
                        setCarId(carCard)
                      }}
                      color="primary"
                      endIcon={<ForwardArrowIcon />}
                      className={classes.nextButtonSelf}
                      disabled={carCard ? false : true}
                      style={{
                        height: "50px",

                        textTransform: "none",
                      }}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </AppBar>
            </Grid>
          )
        }
      }
    }
    // console.log(error)
    // console.log(hourlyRedux)
    return (
      <>
        {isFetching ? <Preloader /> : ifThereisError()}
        {/* {error ? (
          <Error setActiveStep={setActiveStep} />
        ) : (
          
        )} */}
      </>
    )
  }
)

const mapStateToProps = (state) => {
  return {
    cars: state.cars.cars,
    isFetching: state.cars.isFetching,
    error: state.cars.error,
    gateMeeting: state.gateMeeting.isGateMeeting,
    hourlyAndSeatsRedux: state.hourlyAndSeatsRedux.hourlyRedux,
  }
}

export default connect(mapStateToProps, {
  setCarId,
  setGateMeetingRedux,
  setResetWidgetInputs,
})(FleetForm)
