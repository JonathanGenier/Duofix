/*==MODULES===================================================================*/
/*==COMPONENTS================================================================*/
/*==STYLES====================================================================*/
import styles from '../styles/components/formInput.module.css'

/*============================================================================*/

export default function formInputWrapper({ id, title, component, warningStates, warningMessages }) {

    // Title: Title of the input
    // component: inputs (text, checkboxes, numbers, etc.)
    // warningStates: Array of true or false
    // warningMessages: Array of warning messages

    // Render warning messages when the user's input are not valid.
    // Can have multiple warning messages displayed at the same time.
    // The amount of warningStates should be equal to the amount of warningMessages.
    const renderWarnings = () => {

        if (!warningStates && warningMessages) {
            return console.error(
                'FormInput(%s) is missing %d warning state%s.',
                id, warningMessages.length, (warningMessages.length > 1 ? "s" : "")
            )
        }

        if (!warningMessages && warningStates) {
            return console.error(
                'FormInput(%s) is missing %d warning messages%s.',
                id, warningStates.length, (warningStates.length > 1 ? "s" : "")
            )
        }
            
        let stateCount = warningStates.length
        let messageCount = warningMessages.length

        if (stateCount != messageCount) {
            return console.error(
                'FormInput(%s) is missing an element: There are %d warning state%s for %d warning message%s.',
                id, stateCount, (stateCount > 1 ? "s" : ""), messageCount, (messageCount > 1 ? "s" : "")
            )
        }

        let warningsTags = []

        // At this point, stateCount == messageCount
        for (let index = 0; index < stateCount; index++) {
            warningsTags.push(
                <span key={index} className={styles["warning-" + warningStates[index]] + " std-ft-xs"}>{warningMessages[index]}</span>
            )
        }

        return warningsTags
    }

    return (
        <div className={styles.container}>
            <label className={styles.title}>{title}</label>
            {renderWarnings()}
            {component}
        </div>
    )
}