import { useState } from "react";
import { ToggleButton, ButtonGroup } from "react-bootstrap";

export function DataToggle(props) {
    const [radioValue, setRadioValue] = useState('own');

    const radios = [
        { name: 'Use Sample Data', value: 'sample' },
        { name: 'Use my Own Data', value: 'own' }
    ];

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <>
                <ButtonGroup className="mb-2">
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="primary"
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => { setRadioValue(e.currentTarget.value); props.useSample(radio.value) }}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </>
        </div>
    );
}