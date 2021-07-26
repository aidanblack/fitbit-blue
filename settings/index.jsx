function blueSettings(props) {
    return (
        <Page>
            <Section
                title={<Text bold>Blue Settings</Text>}>
                <Select
                    label={`Temperature Unit`}
                    settingsKey="tempUnit"
                    options={[
                        { name: "Celsius" },
                        { name: "Farenheit" }
                    ]}
                />
                <Select
                    label={`Background Color`}
                    settingsKey="faceColor"
                    options={[
                        { name: "Blue" },
                        { name: "Green" },
                        { name: "Red" },
                        { name: "Grey" },
                        { name: "Brown" }
                    ]}
                />
                <Select
                    label={`Style`}
                    settingsKey="faceShape"
                    options={[
                        { name: "Round" },
                        { name: "Square" }
                    ]}
                />
                {/* <Toggle
                    settingsKey="hideDate"
                    label="Hide Date"
                />
                <Toggle
                    settingsKey="hideWeather"
                    label="Hide Weather"
                />
                <Toggle
                    settingsKey="hideHeartRate"
                    label="Hide Heart Rate"
                />
                <Toggle
                    settingsKey="hideGoals"
                    label="Hide Goals"
                /> */}
            </Section>
        </Page>
    );
}

registerSettingsPage(blueSettings);