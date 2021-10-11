import { h } from 'preact';
import classNames from 'classnames';
import { Accordion as BaseAccordion } from 'primereact/accordion';

export class Accordion extends BaseAccordion {
  onTabHeaderClick(event, tab, index) {
    if (!tab.props.disabled) {
      const selected = this.isSelected(index);
      let newActiveIndex;

      if (this.props.multiple) {
        let indexes = (this.props.onTabChange ? this.props.activeIndex : this.state.activeIndex) || [];

        if (selected) {
          indexes = indexes.filter(i => i !== index);
        } else {
          indexes = [ ...indexes, index ];
        }

        newActiveIndex = indexes;
      } else {
        newActiveIndex = selected ? null : index;
      }

      let callback = selected ? this.props.onTabClose : this.props.onTabOpen;

      if (callback) {
        callback({ originalEvent: event, index });
      }

      if (this.props.onTabChange) {
        this.props.onTabChange({
          originalEvent: event,
          index: newActiveIndex
        });
      } else {
        this.setState({
          activeIndex: newActiveIndex
        });

        // onTabChange forces controlled mode, which makes tab headers lose focus when re-rendered.
        if (this.props.onUncontrolledTabChange) {
          this.props.onUncontrolledTabChange({
            originalEvent: event,
            index: newActiveIndex
          });
        }
      }
    }

    event.preventDefault();
  }

  renderTabContent(tab, selected, index) {
    const className = tab.props.contentClassName;
    const id = `${this.state.id}_content_${index}`;

    // Do not use transitions (they do not look nice in a popup).
    return this.isSelected(index) && (
      <div
        id={id}
        className={className}
        style={tab.props.contentStyle}
        role="region"
        aria-labelledby={`${this.state.id}_header_${index}`}
      >
        <div className="p-accordion-content">
          {tab.props.children}
        </div>
      </div>
    );
  }

  renderTab(tab, index) {
    const selected = this.isSelected(index);
    const tabHeader = this.renderTabHeader(tab, selected, index);
    const tabContent = this.renderTabContent(tab, selected, index);
    const tabClassName = classNames('p-accordion-tab', { 'p-accordion-tab-active': selected });

    // Forward tab refs to the tab wrappers. Use the tab key if available.
    return (
      <div ref={tab.ref} key={tab.key || tab.props.header} className={tabClassName}>
        {tabHeader}
        {tabContent}
      </div>
    );
  }
}

export { AccordionTab } from 'primereact/accordion';
