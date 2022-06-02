import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import React, { ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';
import Api from '../api/api';
import ResumeSection from './ResumeSection';
import { Section } from '../types/types';
import { TemporarySectionId } from '../constants/helperEnums';
import LoadingSkeleton from './LoadingSkeleton';


type ResumeSectionListState = {
  sections: Section[],
  sectionSelectedForEdit: { 
    editMode: boolean; 
    id: number; 
    isTitleValid: boolean; 
    isContentValid: boolean;
  },
  loading: boolean;
}

type ResumeSectionListProps = {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  isUserLoggedIn: boolean;
}

class ResumeSectionList extends React.Component<ResumeSectionListProps, ResumeSectionListState> {
  api: Api;

  constructor(props: any) {
    super(props);
    this.api = new Api();

    this.state = {
      sections: [],
      sectionSelectedForEdit: { 
        editMode: false, 
        id: TemporarySectionId.NoneSelected,
        isTitleValid: true,
        isContentValid: true  
      },
      loading: true
    };
  }

  componentDidMount() {
    this.getAndSetAllSections();
  }

  /**
   * Gets list of all sections from the API and sets them in the sections array
   */
  getAndSetAllSections(): void {
    this.api.getSectionList()
      .then((res: any) => {
        this.setState({
          sections: res.map((section: any) => {
            return {
              id: section.id,
              title: section.title,
              content: section.content
            }
          })
        });

        this.setState({
          loading: false
        })
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }

  /**
   * Adds empty section to the sections array, sets the added section to selected for edit.
   */
  addNewSection() {
    const sections = this.state?.sections;
    sections.push({
      id: TemporarySectionId.Add,
      title: "",
      content: ""
    });

    this.setState({
      sections: sections
    });

    this.setSectionSelectedForEdit(true, TemporarySectionId.Add);
  }

  /**
   * Stores data which indicates whether or not a section is currently being edited
   * @param editMode Denotes whether or not a section is currently being edited
   * @param id Unique value for each section
   */
  setSectionSelectedForEdit(
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
   * @param id The unique section id
   * return the Section object
   */
  getSection(id: number): any {
    return this.state.sections.find((section) => id === section.id);
  }

  /**
   * Deletes the specified section
   * @param id The unique section id
   */
  deleteSection(id: number): void {
    const sections = this.state.sections;
    const deleteIndex = sections.findIndex((section) => id === section.id);
    
    // remove section at specified index
    sections.splice(deleteIndex, 1);

    this.setState({
      sections: sections
    })
  }

  /**
   * Overrides existing section
   * @param section The section object
   */
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
   * @param e The react event
   * @param id Unique value for each section
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
   * @param e The react event
   * @param id Unique value for each section
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
        <div className="sections-wrapper">
          <div className="sections-body">
            {
              this.state.sections.map((value) => {
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
                    setSectionSelectedForEdit={(editMode: boolean, id: number) => this.setSectionSelectedForEdit(editMode, id)}
                    setIsUserLoggedIn={(isUserLoggedIn: boolean) => this.props.setIsUserLoggedIn(isUserLoggedIn)}
                    isUserLoggedIn={this.props.isUserLoggedIn}
                    deleteSection={(id: number) => this.deleteSection(id)}
                    setSection={(section: Section) => this.setSection(section)}
                    getAndSetAllSections={() => this.getAndSetAllSections()}
                  />
                )
              })
            }
            {
              this.state.loading &&
              <div>
                <LoadingSkeleton/>
                <LoadingSkeleton/>
                <LoadingSkeleton/>
              </div>
            }
          </div>
          {this.props.isUserLoggedIn && 
            <div className={this.state.sections.length > 0 ? "sections-footer" : "sections-footer-no-sections"}>
              <Button variant="primary" className="flex-align-center" disabled={this.state.sectionSelectedForEdit.editMode} onClick={() => this.addNewSection()}>
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

export default ResumeSectionList;