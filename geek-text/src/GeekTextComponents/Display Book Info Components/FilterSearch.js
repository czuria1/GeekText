import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Checkbox, FormControlLabel} from '@material-ui/core';

const FilterSearch = (props) => {
    return  <div id="expansionPanelContainer" style={{float: "left"}}>
            <ExpansionPanel>
                <ExpansionPanelSummary >Authors</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControlLabel control={<Checkbox/>} label="Author" />
                    <FormControlLabel control={<Checkbox/>} label="Author 2" />
                    <FormControlLabel control={<Checkbox/>} label="Author 3" />
                    <FormControlLabel control={<Checkbox/>} label="Author 4" />
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary >Genre</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControlLabel control={<Checkbox/>} label="Genre 1" />
                    <FormControlLabel control={<Checkbox/>} label="Genre 2" />
                    <FormControlLabel control={<Checkbox/>} label="Genre 3" />
                    <FormControlLabel control={<Checkbox/>} label="Genre 4" />
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary >Ratings</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControlLabel control={<Checkbox/>} label="Rating 1" />
                    <FormControlLabel control={<Checkbox/>} label="Rating 2" />
                    <FormControlLabel control={<Checkbox/>} label="Rating 3" />
                    <FormControlLabel control={<Checkbox/>} label="Rating 4" />
                    <FormControlLabel control={<Checkbox/>} label="Rating 4" />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
     
}
 
export default FilterSearch;