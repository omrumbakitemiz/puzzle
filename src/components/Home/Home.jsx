import React, { useState, useEffect } from 'react';
import './Home.css';

import {
  Button,
  Collapse,
  CustomInput,
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
} from 'reactstrap';

import { cutImage, generateFakeLayout, getBase64 } from '../../utils';
import BasicLayout from '../GridLayout/GridLayout';

const Home = () => {
  const [collapse, setCollapseOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePieces, setImagePieces] = useState([]);
  const [onload, setOnload] = useState(false);
  const [fakeLayout, setFakeLayout] = useState([]);

  useEffect(() => {
    setFakeLayout(generateFakeLayout());
  }, []);

  const originalLayout = [
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

  function setGeneratedFakeLayout(generatedFakeLayout) {
    setFakeLayout(generatedFakeLayout);
    setOnload(false);
    setTimeout(() => {
      setOnload(true);
    }, 100);
  }

  function onShuffle() {
    const generatedFakeLayout = generateFakeLayout();
    setGeneratedFakeLayout(generatedFakeLayout);
  }

  function onImageSelect(event) {
    getBase64(event.target.files[0], result => {
      const tempImage = new Image();
      tempImage.src = result;
      tempImage.onload = () => {
        setImage(tempImage.src);
        const tempImagePieces = cutImage(tempImage, 4, 4);
        setImagePieces(tempImagePieces);

        imagePieces.map((imagePiece, index) => (originalLayout[index].i = imagePiece.key.toString()));
        setOnload(true);
      };
    });
  }

  return (
    <Container>
      <Navbar color="transparent" light expand="md">
        <NavbarBrand href="/">Puzzle Game</NavbarBrand>
        <NavbarToggler onClick={() => setCollapseOpen(!collapse)} />
        <Collapse isOpen={collapse} navbar>
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
              <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" onChange={event => onImageSelect(event)} />
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3 mb-4 justify-content-center">
        <Button disabled={!image} className="mx-auto w-50" outline color="success" size="lg" onClick={() => onShuffle()}>
          Shuffle
        </Button>
      </Row>
      <Row style={{ marginLeft: '300px' }}>
        {onload ? <BasicLayout layout={originalLayout} fakeLayout={fakeLayout} images={imagePieces} firstTimeProp /> : null}
      </Row>
    </Container>
  );
};

export default Home;
