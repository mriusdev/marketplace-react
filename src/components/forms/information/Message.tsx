import styles from './warning.module.scss'

export const MessageStyleNames = {
  warning: 'warning',
  success: 'success',
}

export const MessageStyles: IMessageStyles = {
  warning: {
    name: 'warning',
    text: 'Warning',
    icon: 'error_outline'
  },
  success: {
    name: 'success',
    text: 'Success',
    icon: 'check_circle'
  },
}

interface IMessageProps {
  style?: string
  message: string
}

interface IMessageStyle {
  name: string
  text: string
  icon: string
}

interface IMessageStyles {
  [key: string]: IMessageStyle
}

export default function Message(props: IMessageProps)
{
  function getStyleName(): string
  {
    if (!props.style || !Object.values(MessageStyleNames).includes(props.style)) {
      return MessageStyleNames.warning;
    }
    return props.style
  }

  function getStyle(): IMessageStyle
  {
    return MessageStyles[getStyleName()];
  }

  return (
    <div className={`${styles.information__container} ${styles[`information__container_${getStyle().name}`]}`}>
      <div className={styles.information_icon__container}>
        <span className={`material-icons-outlined`}>
          {getStyle().icon}
        </span>
      </div>
      <div className={styles.information_message__container}>
        <span className={styles.information_message__title}>{getStyle().text}</span>
        <span>{props.message}</span>
      </div>
    </div>
  )
}
