import { Box, Typography } from "@mui/material";

//TODO : Yellow  bar

const ProgressBar = (props) => {
  const { title, bgcolor, completed } = props;

  const containerStyles = {
    height: 30,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <Box>
      <Typography variant="h4" ml={1} mb={2} color="white">
        {`${title}`}
      </Typography>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
      <Typography variant="h6" ml={1} mt={1} color="white">
        {`${completed}% Completed`}
      </Typography>
    </Box>
  );
};

export default ProgressBar;
