import * as React from 'react'
import * as moment from 'moment'

import { Octicon, OcticonSymbol } from '../octicons'
import { HighlightText } from '../lib/highlight-text'

interface IBranchProps {
  readonly name: string
  readonly isCurrentBranch: boolean

  /** The date may be null if we haven't loaded the tip commit yet. */
  readonly lastCommitDate: Date | null

  /** The characters in the branch name to highlight */
  readonly matches: ReadonlyArray<number>

  readonly renderDescription?: () => JSX.Element
}

/** The branch component. */
export class BranchListItem extends React.Component<IBranchProps, {}> {
  public render() {
    const lastCommitDate = this.props.lastCommitDate
    const isCurrentBranch = this.props.isCurrentBranch
    const name = this.props.name

    const date = lastCommitDate ? moment(lastCommitDate).fromNow() : ''
    const icon = isCurrentBranch ? OcticonSymbol.check : OcticonSymbol.gitBranch
    const infoTitle = isCurrentBranch
      ? 'Current branch'
      : lastCommitDate ? lastCommitDate.toString() : ''
    return (
      <div className="branches-list-item">
        <Octicon className="icon" symbol={icon} />
        <div className="name" title={name}>
          <HighlightText text={name} highlight={this.props.matches} />
        </div>
        <div className="description" title={infoTitle}>
          {this.props.renderDescription ? this.props.renderDescription() : date}
        </div>
      </div>
    )
  }
}
