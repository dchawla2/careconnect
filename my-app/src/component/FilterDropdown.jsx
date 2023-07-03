import { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from "react-bootstrap/Container";
const FilterDropdown = (props) => {
    const { title, items, scroll, onChange } = props;
    const [choice, setChoice] = useState(title);

    const handleClick = (value) => {
        setChoice(value);
        onChange(value);
    };

    return (
        <DropdownButton title={choice}>
            <Container style={scroll ? { height: "20rem", overflowY: "scroll" } : {}}>
                {items?.map((item) => {
                    return (
                        <Dropdown.Item onClick={() => handleClick(item)}>
                            {item}
                        </Dropdown.Item>
                    );
                })}
            </Container>
        </DropdownButton>
    );
};

export default FilterDropdown;