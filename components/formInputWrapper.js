/*==MODULES===================================================================*/

/*==COMPONENTS================================================================*/

/*==STYLES====================================================================*/
import styles from '../styles/components/formInput.module.css'

/*============================================================================*/

export default function formInput({ title, component, warningStates, warningMessages }) {

    const renderWarnings = () => {
        let stateCount = warningStates.length
        let messageCount = warningMessages.length

        if (stateCount != messageCount) {
            return console.error(
                'FormInput(%s) is missing an element: There are %d warning state%s for %d warning message%s.',
                title, stateCount, (stateCount > 1 ? "s" : ""), messageCount, (messageCount > 1 ? "s" : "")
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
            {/* {<input id={inputId} type="text" placeholder={placeholder} onChange={onChangeFn} defaultValue={defaultValue}></input>} */}
        </div>
    )
}