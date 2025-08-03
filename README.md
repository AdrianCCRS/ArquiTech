# ArquiTech - Project Description

## Overview
ArquiTech is an academic web portfolio project developed by a team of 5 Computer Systems Engineering students at Universidad Industrial de Santander (UIS) for their Computer Architecture course. The project serves as both a team presentation platform and a showcase of their practical work with the Nand2Tetris educational platform.

## Project Structure

### Frontend Architecture
The project follows a traditional static website structure with clean separation of concerns:

```
ArquiTech/
├── index.html              # Main HTML file with team presentation
├── styles/
│   ├── styles.css          # Main stylesheet with CSS custom properties
│   └── reset.css           # CSS reset for cross-browser compatibility
├── src/
│   ├── img/                # Team photos and project images
│   ├── project1_img/       # Technical diagrams for Practice 1
│   ├── project3_img/       # Assets for Practice 3
│   └── project4_img/       # Assets for Practice 4
├── projects/
│   └── nand2tetris/        # Academic exercises and implementations
│       ├── practica1/      # Logic gates implementation
│       ├── practica2/      # Arithmetic logic unit
│       ├── practica3/      # Memory systems
│       └── practica4/      # Assembly compiler
└── README.md               # Project documentation
```

## Technologies Used

### Frontend Technologies
- **HTML5**: Semantic markup with proper accessibility considerations
- **CSS3**: Modern styling with advanced features including:
  - CSS Custom Properties (CSS Variables) for consistent theming
  - CSS Grid and Flexbox for responsive layouts
  - CSS Layers for better organization (@layer directive)
  - Google Fonts integration (Radio Canada Big, Anton)
  - Smooth scroll behavior
  - Custom SVG icons and graphics

### Development Tools
- **Git**: Version control system
- **GitHub**: Repository hosting and collaboration
- **GitHub Pages**: Static site hosting
- **Webhint**: Code quality and web standards linting (configured in .hintrc)

### Hardware Description Language
- **HDL (Hardware Description Language)**: For implementing digital logic circuits in the Nand2Tetris platform

## Good Practices and Patterns Implemented

### 1. CSS Architecture
- **CSS Custom Properties**: Consistent color scheme and typography using CSS variables
- **CSS Reset**: Implemented Meyer's CSS reset for cross-browser consistency
- **Layered CSS**: Using @layer directive for better cascade management

### 2. HTML Structure
- **Semantic HTML**: Proper use of semantic elements (header, nav, main, section)
- **Accessibility**: Alt attributes for images, proper heading hierarchy
- **SEO Optimization**: Meta tags for charset and viewport
- **Progressive Enhancement**: Core functionality works without JavaScript

### 3. User Experience
- **Smooth Navigation**: CSS smooth scroll behavior for internal links
- **Interactive Elements**: Dropdown navigation with visual feedback
- **Visual Hierarchy**: Clear typography and spacing for content organization
- **External Links**: Proper target="_blank" for external resources

### 4. Code Organization
- **Separation of Concerns**: HTML, CSS, and JavaScript properly separated
- **Modular CSS**: Reset and main styles in separate files
- **Asset Organization**: Logical folder structure for images and resources
- **Documentation**: Comprehensive README with technical explanations

### 5. Academic Integration
- **Technical Documentation**: Detailed explanations of digital logic implementations
- **Visual Learning**: Circuit diagrams and technical illustrations
- **Code Examples**: Well-commented HDL implementations
- **External References**: Links to relevant educational resources

### 6. Version Control
- **Git Best Practices**: Proper repository structure
- **GitHub Integration**: Seamless hosting with GitHub Pages
- **Documentation**: Clear README with project overview and technical details

### 7. Performance Considerations
- **Optimized Images**: Appropriate image formats and sizes
- **Minimal JavaScript**: Only essential interactive functionality
- **External Resource Management**: Strategic use of Google Fonts with display=swap

## Academic Content Quality

### Nand2Tetris Implementation
The project demonstrates solid understanding of digital logic fundamentals:
- **Complete Gate Library**: Implementation of all basic logic gates (AND, OR, NOT, XOR, NAND)
- **Multi-bit Operations**: 16-bit versions of fundamental operations
- **Multiplexers/Demultiplexers**: Complex routing logic implementation
- **Technical Accuracy**: Correct HDL syntax and logic implementations

### Educational Value
- **Clear Explanations**: Step-by-step reasoning for each implementation
- **Visual Aids**: Circuit diagrams supporting theoretical concepts
- **Progressive Complexity**: Logical progression from simple to complex circuits
- **Real-world Application**: Connection between theory and practical implementation

## Team Members and Collaboration

### Team Composition
The ArquiTech project is developed by a collaborative team of 5 Computer Systems Engineering students from Universidad Industrial de Santander (UIS):

- **Yeison Adrian Caceres Torres** - Team Lead and Frontend Developer
  - Profile: [https://adrianccrs.github.io/ArquiTech/index.html#adrian](https://adrianccrs.github.io/ArquiTech/index.html#adrian)
  - Role: Project coordination, web development, and digital logic implementation

- **Daniel Sebastian Badillo Neira** - HDL Developer and Documentation Specialist
  - Profile: [https://adrianccrs.github.io/ArquiTech/index.html#sebastian](https://adrianccrs.github.io/ArquiTech/index.html#sebastian)
  - Role: Hardware description language implementation and technical documentation

- **Leider Joanny Esteban Lozano** - Circuit Design and Testing Specialist
  - Profile: [https://adrianccrs.github.io/ArquiTech/index.html#leider](https://adrianccrs.github.io/ArquiTech/index.html#leider)
  - Role: Digital circuit design and validation testing

- **Andres Felipe Avella Rubiano** - System Architecture and Integration Specialist
  - Profile: [https://adrianccrs.github.io/ArquiTech/index.html#andres](https://adrianccrs.github.io/ArquiTech/index.html#andres)
  - Role: System architecture design and component integration

- **Miguel Ángel Angulo Duarte** - Quality Assurance and Documentation Coordinator
  - Profile: [https://adrianccrs.github.io/ArquiTech/index.html#Miguel](https://adrianccrs.github.io/ArquiTech/index.html#Miguel)
  - Role: Code review, quality assurance, and documentation coordination

### Team Collaboration Features
- **Individual Profiles**: Comprehensive team member presentations with personal backgrounds
- **Social Media Integration**: Professional networking links for each team member
- **Academic Information**: Course context and institutional affiliation
- **Multilingual Support**: Spanish language interface for local context
- **Distributed Development**: Collaborative workflow using Git and GitHub for version control

## Technical Highlights
- **Cross-browser Compatibility**: CSS reset and standard-compliant code
- **Responsive Design**: Works across different screen sizes
- **Performance Optimized**: Minimal resource usage with fast loading times
- **Maintainable Code**: Clean, well-organized codebase with clear naming conventions

The ArquiTech project successfully combines academic rigor with modern web development practices, creating an effective portfolio that demonstrates both technical competency and professional presentation skills.
