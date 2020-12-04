import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Grommet, Grid, ResponsiveContext, Icons } from "grommet";
import TrailCard from "./TrailCard";
export default function TrailContainer() {
  const trailResults = useSelector((state) => state.trail.trails);
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Grommet>
      <ResponsiveContext.Consumer>
        {(size) =>
          trailResults && (
            <Box
              animation={["fadeIn", "slideUp"]}
              pad="medium"
              align="center"
              style={{ border: "4px solid green" }}

              //   style={{ maxWidth: "1200px" }}
            >
              <Box
                style={{ border: "2px solid red" }}
                direction="row-responsive"
                gap="medium"
                align="center"
                justify="center"
                wrap
              >
                {trailResults &&
                  trailResults.map((trailInfo) => {
                    return (
                      <TrailCard key={trailInfo.id} trailInfo={trailInfo} />
                    );
                  })}
              </Box>
              <Link to="/trails">
                <Button primary label="See more results" margin="medium" />
              </Link>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}
