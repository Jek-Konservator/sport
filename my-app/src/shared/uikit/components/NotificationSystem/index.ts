import { Notifications, notifications } from "@mantine/notifications";
import type { NotificationData } from "@mantine/notifications";
import "@mantine/core/styles/CloseButton.css";
import "@mantine/core/styles/Loader.css";
import "@mantine/core/styles/Notification.css";
import "@mantine/notifications/styles.css";

export const notify = {
  show: (data: NotificationData) => notifications.show(data),
};

export type { NotificationData };
export { Notifications };
