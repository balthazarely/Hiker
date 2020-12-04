import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_SIDEBAR } from "../reducers/themeReducer";
import { Box, Button, Collapsible, ResponsiveContext, Layer } from "grommet";
import { FormClose } from "grommet-icons";

export default function Sidebar() {
  const dispatch = useDispatch();
  const sideBarOpen = useSelector((state) => state.theme.sideBarOpen);
  return (
    <div>
      <ResponsiveContext.Consumer>
        {(size) => (
          <div>
            {!sideBarOpen && (
              <Layer>
                <Box
                  background="light-2"
                  tag="header"
                  justify="end"
                  align="center"
                  direction="row"
                >
                  <Button
                    icon={<FormClose />}
                    onClick={() => dispatch({ type: TOGGLE_SIDEBAR })}
                    focusIndicator={false}
                  />
                </Box>
                <Box fill background="light-2" align="center" justify="center">
                  sidebar
                </Box>
              </Layer>
            )}

            {/* {!sideBarOpen || size !== "small" ? (
              <Collapsible direction="horizontal" open={sideBarOpen}>
                <Box
                  flex
                  width="medium"
                  background="light-2"
                  elevation="small"
                  align="center"
                  justify="center"
                >
                  sidebar
                </Box>
              </Collapsible>
            ) : (
              <Layer>
                <Box
                  background="light-2"
                  tag="header"
                  justify="end"
                  align="center"
                  direction="row"
                >
                  <Button
                    icon={<FormClose />}
                    onClick={() => dispatch({ type: TOGGLE_SIDEBAR })}
                    focusIndicator={false}
                  />
                </Box>
                <Box fill background="light-2" align="center" justify="center">
                  sidebar
                </Box>
              </Layer>
            )} */}
          </div>
        )}
      </ResponsiveContext.Consumer>
    </div>
  );
}
