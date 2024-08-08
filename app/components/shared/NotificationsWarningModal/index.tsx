import { Box, Grid, Modal, Stack, Typography } from "@mui/material";
import acceptNotifications from "./../../../assets/images/icons/notifications/accept-notifications.png";
import autoBlockedNotifications from "./../../../assets/images/icons/notifications/auto-blocked-notifications.png";
import manageNotificationsSettings from "./../../../assets/images/icons/notifications/manage-notifications-settings.png";
import manageNotificationsOptions from "./../../../assets/images/icons/notifications/manage-notifications-options.png";
import notificationsIcon from "./../../../assets/images/icons/notifications/notification-icon.png";

interface Props {
  showModal: boolean;
}

export default function NotificationsWarningModal({ showModal }: Props) {
  return (
    <Modal
      open={showModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          width: "90%",
          maxWidth: 750,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "1rem",
          overflow: "auto",
          height:400,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component={"h6"}
            sx={{
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            🛑 ¡Un momento! Antes de continuar, lee como activar las notificaciones para hacer tu experiencia mucho mejor. 📬✨
          </Typography>
          

          <Stack direction={"column"} spacing={3}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="body1" component={"p"}>
                Una vez aparezca el mensaje de tu navegador solicitando permisos por favor haz clic en el botón "Permitir".
                Esto habilitará las notificaciones en tiempo real.
                ¡Es solo un click y estarás siempre al día! 🚀✨
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <img
                  src={acceptNotifications.src}
                  alt="Icono de inicio de sesión"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component={"p"}>
                  Las notificaciones pueden estar bloqueadas por defecto en tu navegador, de ser el caso debes hacer lo siguiente:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <img
                  src={manageNotificationsSettings.src}
                  alt="Icono de inicio de sesión"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component={"p"}>
                  Haz click en "Gestionar"
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <img
                  src={manageNotificationsOptions.src}
                  alt="Icono de inicio de sesión"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component={"p"}>
                  Selecciona las opciones que se indican en la imagen referencial
                </Typography>
              </Grid>
            </Grid>

            <Typography
            variant="h6"
            component={"h6"}
            sx={{
              textAlign: "center",
            }}
          >
            Recarga tu navegador... ¡Y listo!
          </Typography>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
