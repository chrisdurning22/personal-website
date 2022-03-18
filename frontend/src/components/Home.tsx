import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import React, { ChangeEvent } from 'react';
import { Button, Card } from 'react-bootstrap';
import Api from '../api/api';
import profilePicture from '../images/photos/graduation.png'
import ResumeSection from './ResumeSection';
import { Section } from '../types/types';

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
    console.log('home');

    this.state = {
      sections: [],
      sectionSelectedForEdit: { 
        editMode: false, 
        id: -1,
        isTitleDirty: false, 
        isContentDirty: false,
        isTitleValid: true,
        isContentValid: true  
      } 
    };
  }

  componentDidMount() {
    this.api.getSectionList()
      .then((res: any) => {
        console.log(res);
        this.setState({
          sections: res.map((section: any) => {
            return {
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

  addNewSection(index: number) {
    console.log('add new sections: ', index);
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
  getSection(id: number): Section {
    return this.state.sections[id];
  }

  /**
   * Handles section title change
   * @param e the react event
   * @param id unique value for each section
   */
  handleTitleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const sections = this.state.sections;
    
    sections[id].title = e.target.value
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
    
    sections[id].content = e.target.value
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
          {this.state.sections.map((value, index) => {
            return (
              <ResumeSection
                key={index}
                id={index}
                isActive={this.state.sectionSelectedForEdit.id === index}
                title={value.title}
                content={value.content}
                isTitleValid={this.state.sectionSelectedForEdit.isTitleValid}
                isContentValid={this.state.sectionSelectedForEdit.isContentValid}
                handleTitleChange={(e: ChangeEvent<HTMLInputElement>, index: number) => this.handleTitleChange(e, index)}
                handleContentChange={(e: ChangeEvent<HTMLTextAreaElement>, index: number) => this.handleContentChange(e, index)}
                setSelectedSection={(editMode: boolean, id: number) => this.setSelectedSection(editMode, id)}
                setIsUserLoggedIn={(isUserLoggedIn: boolean) => this.props.setIsUserLoggedIn(isUserLoggedIn)}
                isUserLoggedIn={this.props.isUserLoggedIn}
              />
            )
          })}
          </div>
          <div className="sections-footer">
            {/* <i onClick={this.addNewSection}><FontAwesomeIcon icon={faSquarePlus} size={"3x"}/></i> */}
            {/* <i onClick={this.removeNewSection}><FontAwesomeIcon icon={faSquareMinus} size={"3x"}/></i> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;