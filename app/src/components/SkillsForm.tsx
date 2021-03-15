import axios from "axios";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Level, Skill } from "../interfaces/skills";

function Layout(props: any) {
  const { skills, levels, providerSkills, onSkillSelection } = props;

  const levelRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleChange = (skill: string, levelRange: number) => {
    const level: Level = levels.find((l: Level) =>
      l.range.includes(levelRange)
    )!;
    const selectedSkills: Skill[] = providerSkills.filter(
      (s: Skill) => s.name !== skill
    );
    selectedSkills.push({
      name: skill,
      level: {
        ...level,
        range: [levelRange],
      },
    });
    onSkillSelection(selectedSkills);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        My skills
      </Typography>
      <Grid container spacing={3}>
        {skills.map((skill: string, index: number) => (
          <React.Fragment key={index}>
            <Grid item xs={12} md={3}>
              <Typography variant="button" display="block" gutterBottom>
                {skill}
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Experience</FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="1"
                >
                  {levelRange.map((level: number) => (
                    <FormControlLabel
                      value={`${index}-${level}`}
                      key={`${index}-${level}`}
                      control={<Radio color="primary" />}
                      label={level}
                      labelPlacement="bottom"
                      onChange={() => handleChange(skill, level)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export class SkillsForm extends Component {
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {
      skills: [],
      isLoading: true,
      levels: [],
      providerSkills: [],
    };
  }

  componentDidMount() {
    this.fecthSkills();
    this.fecthLevels();
  }
  fecthSkills() {
    const url = "http://localhost:4040/api/skills";
    axios
      .get(url)
      .then(({ data }) => {
        const skills = data;
        this.setState({ skills, isLoading: false });
      })
      .catch((err) => console.log({ err }));
  }

  fecthLevels() {
    const url = "http://localhost:4040/api/skills/levels";
    axios
      .get(url)
      .then(({ data }) => {
        const levels = data;
        this.setState({ levels, isLoading: false });
      })
      .catch((err) => console.log({ err }));
  }

  render() {
    const { isLoading, skills, levels, providerSkills } = this.state as any;

    const handleSkillSelection = (selectedSkills: Skill[]) => {
      localStorage.setItem("selectedSkills", JSON.stringify(selectedSkills));
      this.setState({ providerSkills: selectedSkills });
    };
    return (
      <React.Fragment>
        {!isLoading ? (
          <Layout
            skills={skills}
            levels={levels}
            providerSkills={providerSkills}
            onSkillSelection={handleSkillSelection}
          />
        ) : (
          <Grid item xs={12}>
            <p>Loading...</p>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}
