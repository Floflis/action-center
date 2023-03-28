const Applet = imports.ui.applet;
const Gio = imports.gi.Gio;

class BluetoothNFCApplet extends Applet.TextIconApplet {

    constructor(metadata, orientation, panelHeight, instanceId) {
        super(orientation, panelHeight, instanceId);
        this.metadata = metadata;
        this._bluetoothScript = Gio.AppInfo.create_from_commandline("gnome-control-center bluetooth");
        this._nfcScript = Gio.AppInfo.create_from_commandline("gnome-control-center nfc");
        this.set_applet_icon_symbolic_name("bluetooth-symbolic");
        this.set_applet_label("Action Center");
        this.set_applet_tooltip("Bluetooth and NFC applet");
        this.set_applet_name("Bluetooth and NFC applet");
        this._bluetoothButton = new Applet.AppletIcon("bluetooth-symbolic", "Bluetooth");
        this._nfcButton = new Applet.AppletIcon("nfc-symbolic", "NFC");
        this.add_applet_icon(this._bluetoothButton);
        this.add_applet_icon(this._nfcButton);
        this._bluetoothButton.connect('clicked', this._onBluetoothButtonClicked.bind(this));
        this._nfcButton.connect('clicked', this._onNfcButtonClicked.bind(this));
    }

    _onBluetoothButtonClicked() {
        this._bluetoothScript.launch();
        this._bluetoothButton.set_applet_icon_name("bluetooth-active-symbolic");
    }

    _onNfcButtonClicked() {
        this._nfcScript.launch();
        this._nfcButton.set_applet_icon_name("nfc-active-symbolic");
    }

}

function main(metadata, orientation, panelHeight, instanceId) {
    return new BluetoothNFCApplet(metadata, orientation, panelHeight, instanceId);
}
