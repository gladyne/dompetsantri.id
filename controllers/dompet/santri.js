const Santri = require('../../models/dompet/santri'); 

const getSantri = async (req,res) => {
    const santri = await Santri.find();
    res.render('./dompet/santri', {dataSantri: santri});
}

const topupData = async (req, res) => {
    const noRekening = req.params.rekening;
    const params = await Santri.findOne({noRekening: noRekening});
    if(params === null) {
        res.send('<h1>Tidak Ada Rekening</h1>');
    } 
    else {
        res.render('./dompet/topup', {
            nama: params.nama,
            nis: params.nis,
            noRekening: params.noRekening,
            pesantren: params.pesantren,
            saldoNow: params.saldo
        });
    }
}

const topup = async (req, res) => {
    const saldoAdding = parseInt(req.body.saldo);
    const noRekening = req.params.rekening;
    const params = await Santri.findOne({noRekening: noRekening})
    const saldoBefore = params.saldo;
    const saldoAfter = saldoBefore + saldoAdding;
    await Santri.updateOne({noRekening: noRekening}, {saldo: saldoAfter});
    res.redirect('/topupSuccess');
}

const topupSuccess = (req, res) => {
    res.render('./dompet/topup-success');
}

const topupFail = (req, res) => {
    res.render('./dompet/topup-fail');
}


exports.getSantri = getSantri;
exports.topupData = topupData;
exports.topup = topup;
exports.topupSuccess = topupSuccess;
exports.topupFail = topupFail;
exports.topupFail = topupFail;