import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import React, { ChangeEvent } from 'react';
import { Button, Card } from 'react-bootstrap';
import Api from '../api/api';
import profilePicture from '../images/photos/graduation.png'
import ResumeSection from './ResumeSection';
import { Section } from '../types/types';
import { TemporarySectionId } from '../constants/helperEnums';

type HomeState = {
  sections: Section[],
  sectionSelectedForEdit: { 
    editMode: boolean; 
    id: number; 
    isTitleDirty: boolean; 
    isContentDirty: boolean; 
    isTitleValid: boolean; 
    isContentValid: boolean 
  };
}

type HomeProps = {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  isUserLoggedIn: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  api: Api;

  constructor(props: any) {
    super(props);
    this.api = new Api();

    this.state = {
      sections: [],
      sectionSelectedForEdit: { 
        editMode: false, 
        id: TemporarySectionId.NoneSelected,
        isTitleDirty: false, 
        isContentDirty: false,
        isTitleValid: true,
        isContentValid: true  
      } 
    };
  }

  componentDidMount() {
    this.getAndSetAllSections();
  }

  getAndSetAllSections(): void {
    this.api.getSectionList()
      .then((res: any) => {
        console.log(res);
        this.setState({
          sections: res.map((section: any) => {
            return {
              id: section.id,
              title: section.title,
              content: section.content
            }
          })
        });
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }

  addNewSection() {
    console.log('add new sections ', this.state.sections);
    const sections = this.state?.sections;
    sections.push({
      id: TemporarySectionId.Add,
      title: "",
      content: ""
    });

    this.setState({
      sections: sections
    });

    this.setSelectedSection(true, TemporarySectionId.Add);
  }

  removeNewSection() {
    console.log('remove new sections');
  }

  /**
   * Stores data which indicates whether or not a section is being edited
   * @param editMode whether or not a section is currently being edited
   * @param id unique value for each section
   */
  setSelectedSection(
    editMode: boolean,
    id: number,
  ): void {
    this.setState(prevState => ({
      sectionSelectedForEdit: {
        ...prevState.sectionSelectedForEdit,
        editMode,
        id
      }
    }));
  }

  /**
   * Get section using section id
   * @param id unique value for each section
   * return the Section object
   */
  getSection(id: number): any {
    return this.state.sections.find((section) => id === section.id);
  }

  deleteSection(id: number): void {
    const sections = this.state.sections;
    const deleteIndex = sections.findIndex((section) => id === section.id);
    
    // remove section at specified index
    sections.splice(deleteIndex, 1);

    this.setState({
      sections: sections
    })
  }

  setSection(section: Section): void {
    const index = this.state.sections.findIndex((element) => section.id === element.id)
    const sections = this.state.sections;
    sections[index].title = section.title;
    sections[index].content = section.content;

    this.setState({
      sections: sections
    })
  }

  /**
   * Handles section title change
   * @param e the react event
   * @param id unique value for each section
   */
  handleTitleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const sections = this.state.sections;
    
    this.getSection(id).title = e.target.value
    this.setState(prevState => ({ 
      sections: sections,
      sectionSelectedForEdit: {
        ...prevState.sectionSelectedForEdit,
        titleIsDirty: true,
        isTitleValid: e.target.value.length > 0 ? true : false
      }
    }));
  };

  /**
   * Handles section content change
   * @param e the react event
   * @param id unique value for each section
   */
  handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>, id: number) => {
    const sections = this.state.sections;
    this.getSection(id).content = e.target.value
    this.setState(prevState => ({ 
      sections: sections,
      sectionSelectedForEdit: {
        ...prevState.sectionSelectedForEdit,
        contentIsDirty: true,
        isContentValid: e.target.value.length > 0 ? true : false
      }
    }));
  };
  
  render() {
    return (
      <div>
        <div className="flex-center margin-top-80">
          <div className="profile-pic-wrapper">
            <img src={profilePicture}/>
          </div>
        </div>
        <div className="sections-wrapper">
          <div className="sections-body">
          {this.state.sections.map((value) => {
            return (
              <ResumeSection
                key={value.id}
                id={value.id}
                isActive={this.state.sectionSelectedForEdit.id === value.id}
                title={value.title}
                content={value.content}
                isTitleValid={this.state.sectionSelectedForEdit.isTitleValid}
                isContentValid={this.state.sectionSelectedForEdit.isContentValid}
                handleTitleChange={(e: ChangeEvent<HTMLInputElement>, index: number) => this.handleTitleChange(e, index)}
                handleContentChange={(e: ChangeEvent<HTMLTextAreaElement>, index: number) => this.handleContentChange(e, index)}
                setSelectedSection={(editMode: boolean, id: number) => this.setSelectedSection(editMode, id)}
                setIsUserLoggedIn={(isUserLoggedIn: boolean) => this.props.setIsUserLoggedIn(isUserLoggedIn)}
                isUserLoggedIn={this.props.isUserLoggedIn}
                deleteSection={(id: number) => this.deleteSection(id)}
                setSection={(section: Section) => this.setSection(section)}
                getAndSetAllSections={() => this.getAndSetAllSections()}
              />
            )
          })}
          </div>
          {this.props.isUserLoggedIn && 
            <div className={this.state.sections.length > 0 ? "sections-footer" : "sections-footer-no-sections"}>
              <Button variant="primary" className="align-children-center" disabled={this.state.sectionSelectedForEdit.editMode} onClick={() => this.addNewSection()}>
                <label className="add-button-label">Add</label>
                <i><FontAwesomeIcon icon={faSquarePlus} size={"2x"}/></i>
              </Button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Home;