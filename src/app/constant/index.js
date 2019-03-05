module.exports = {
    api : {
        // HOST: 'http://centraldesk-api.maxile.net/',
        HOST: 'http://localhost:3000/',
        DASHBOARD_URL: 'api/dashboard',
        CLIENT_URL: 'api/client',
        HARDWARE_URL: 'api/hardware',
        HARDWARE_CLIENT_URL : 'api/hardware_client',
        INSTALLEDSOFTWARE_URL: 'api/installed_software',
        POLICY_URL: 'api/policy',
        PROGRAMLOG_URL:'api/uninstall_log',
        LICENSE_URL:'api/software_master_license',
        AUTH_URL:'auth/login',
        OWN_USER_URL:'auth/user',
        USER_URL:'api/user',
        PERMISSION_URL:'api/user/permissions',
        ROLE_URL:'api/user/role',
        GROUP_URL:'api/group',
        SETTING_UPDATE_LICENSE_URL:'api/master_license',
    },
    remoteHostname : 'http://centraldesk-api.maxile.net/remote?',
    local : {
        token: 'projectUser',
        user: 'projectUserInfo'
    }
    
}