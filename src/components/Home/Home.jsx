import React, { useState } from 'react';
import './Home.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  CustomInput,
} from 'reactstrap';

import looksame from 'looks-same';
import { cutImage, getBase64 } from '../../utils';
import BasicLayout from '../GridLayout/GridLayout';

const Home = () => {
  const [collapeseOpen, setCollapeseOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePieces, setImagePieces] = useState([]);
  const [onload, setOnload] = useState(false);
  const fileRef = React.createRef();

  const layout = [
    { i: '1', w: 1, h: 1, x: 0, y: 0, isResizable: false },
    { i: '2', w: 1, h: 1, x: 1, y: 0, isResizable: false },
    { i: '3', w: 1, h: 1, x: 2, y: 0, isResizable: false },
    { i: '4', w: 1, h: 1, x: 3, y: 0, isResizable: false },
    { i: '5', w: 1, h: 1, x: 0, y: 1, isResizable: false },
    { i: '6', w: 1, h: 1, x: 1, y: 1, isResizable: false },
    { i: '7', w: 1, h: 1, x: 2, y: 1, isResizable: false },
    { i: '8', w: 1, h: 1, x: 3, y: 1, isResizable: false },
    { i: '9', w: 1, h: 1, x: 0, y: 2, isResizable: false },
    { i: '10', w: 1, h: 1, x: 1, y: 2, isResizable: false },
    { i: '11', w: 1, h: 1, x: 2, y: 2, isResizable: false },
    { i: '12', w: 1, h: 1, x: 3, y: 2, isResizable: false },
    { i: '13', w: 1, h: 1, x: 0, y: 3, isResizable: false },
    { i: '14', w: 1, h: 1, x: 1, y: 3, isResizable: false },
    { i: '15', w: 1, h: 1, x: 2, y: 3, isResizable: false },
    { i: '16', w: 1, h: 1, x: 3, y: 3, isResizable: false },
  ];

  function onImageSelect() {
    const file = fileRef.current.files[0];
    console.log('fileRef:', fileRef.current);

    getBase64(file, result => {
      console.log('result:', result);

      const tempImage = new Image();
      tempImage.src = result;
      tempImage.onload = () => {
        setImage(tempImage.src);
        const tempImagePieces = cutImage(tempImage, 4, 4);
        setImagePieces(tempImagePieces);
        console.log('imagePieces: ', imagePieces);

        imagePieces.map((imagePiece, index) => (layout[index].i = imagePiece.key.toString()));
        console.log('mapWorked');
        setOnload(true);
      };
    });
  }

  return (
    <Container>
      <Navbar color="transparent" light expand="md">
        <NavbarBrand href="/">Puzzle Game</NavbarBrand>
        <NavbarToggler onClick={() => setCollapeseOpen(!collapeseOpen)} />
        <Collapse isOpen={collapeseOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      <Row>
        <Col xs="12">
          <p className="text-center">Home works!</p>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col xs="auto">
          <Form>
            <FormGroup>
              <Label for="exampleCustomFileBrowser">Please select image!</Label>
              <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" innerRef={fileRef} onChange={() => onImageSelect()} />
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>{onload ? <BasicLayout layout={layout} images={imagePieces} /> : null}</Row>
    </Container>
  );
};

export default Home;